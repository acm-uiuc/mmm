import Member from 'models/Member';
import Event from 'models/Event';

import ejs from 'ejs';
import nodemailer from 'nodemailer';

import htmlEmailTemplateRaw from 'templates/email.ejs.html';
import textEmailTemplateRaw from 'templates/email.ejs.txt';

const maximumEventsPerNotification = 5;
const minimumRelevanceToNotify = 1.7;

// Set up nodemailer for emailing
const senderAddress = process.env['MAIL_USERNAME'];
const emailTransport = nodemailer.createTransport({
  host: process.env['MAIL_HOST'],
  port: process.env['MAIL_PORT'],
  auth: {
    user: senderAddress,
    pass: process.env['MAIL_PASSWORD']
  }
});

// Load the email templates
const htmlTemplate = ejs.compile(htmlEmailTemplateRaw, {});
const textTemplate = ejs.compile(textEmailTemplateRaw, {});

/**
 * Entry point for the periodic emailing job.
 */
export async function sendEmailBlast() {
  const members = await Member.find({ current: true });
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);
  const upcomingEvents = await Event.find({
    'eventDate.startTime': { $gte: now, $lt: nextWeek }
  }).populate('org');
  const notifiedUsers = [];
  const promises = [];
  for (const member of members) {
    const interestingEvents = [];
    for (const event of upcomingEvents) {
      const interestScore = scoreInterest(member, event);
      if (interestScore >= minimumRelevanceToNotify) {
        interestingEvents.push({ event: event, score: interestScore });
      }
    }
    if (interestingEvents.length === 0) {
      continue;
    }
    interestingEvents.sort((a, b) => b.score - a.score);
    const bestEvents = interestingEvents
      .slice(0, maximumEventsPerNotification)
      .map((ie) => ie.event);
    bestEvents.sort((a, b) => a.eventDate.startTime - b.eventDate.startTime);
    promises.push(promiseEmail(member.email, bestEvents));
    notifiedUsers.push({
      email: member.email,
      events: bestEvents.map((e) => e.name)
    });
  }
  await Promise.all(promises);
  return notifiedUsers;
}

/**
 * Determines how interested the specified member likely is in the specified event.
 * @param {Member} member the member (from Mongo)
 * @param {Event} event the event (from Mongo)
 * @return {Number} an interest score (larger scores more likely)
 */
function scoreInterest(member, event) {
  if (event.topics.length === 0) {
    return 0.0;
  }
  const memberInterests = new Map();
  member.interests.forEach((i) => (memberInterests[i._id] = i.weight));
  let matches = 0.0;
  let maxRelevance = 0.0;
  for (const topic of event.topics) {
    const relevanceToMember = memberInterests[topic] || 0;
    matches += relevanceToMember;
    maxRelevance = Math.max(maxRelevance, relevanceToMember);
  }
  return (
    matches / Math.sqrt(event.topics.length) +
    1 / (1.3 - matches / event.topics.length) +
    maxRelevance
  );
}

/**
 * Sends an email informing the specified member of the specified events.
 * @param {String} address the member's email address
 * @param {Array<Event>} events the interesting events (from Mongo)
 * @return {Promise<SentMessageInfo>} a promise to send the message
 */
function promiseEmail(address, events) {
  return emailTransport.sendMail({
    from: 'Member-Meeting Matcher <' + senderAddress + '>',
    to: address,
    subject: 'ACM meetings you may be interested in',
    text: textTemplate({ events: events }),
    html: htmlTemplate({ events: events })
  });
}
