import Member from "../models/Member";
import Event from "../models/Event";

// Set up nodemailer for emailing
const nodemailer = require('nodemailer');
const senderAddress = process.env['MAIL_USERNAME'];
const emailTransport = nodemailer.createTransport({
    host: process.env['MAIL_HOST'],
    port: process.env['MAIL_PORT'],
    auth: {
        user: senderAddress,
        pass: process.env['MAIL_PASSWORD']
    }
});

// Load the email template
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const template = ejs.compile(fs.readFileSync(path.resolve('./src/templates/email.ejs.html'), 'utf8'), {});

/**
 * Entry point for the periodic emailing job.
 */
export async function sendEmailBlast() {
    const members = await Member.find({current: true});
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    const upcomingEvents = await Event.find({'eventDate.startTime': {$gte: now, $lt: nextWeek}})
        .sort({'eventDate.startTime': -1})
        .populate('topics');
    for (const member of members) {
        const interestingEvents = [];
        for (const event of upcomingEvents) {
            if (isInteresting(member, event)) {
                interestingEvents.push(event);
            }
        }
        if (interestingEvents.length === 0) {
            continue;
        }
        await sendEmail(member.email, interestingEvents);
        console.log(member.email);
    }
}

/**
 * Determines whether the specified member is likely interested in the specified event.
 * @param {Member} member the member (from Mongo)
 * @param {Event} event the event (from Mongo)
 * @return {Boolean} whether to suggest the event for the member
 */
function isInteresting(member, event) {
    // TODO!
    console.log(event.name);
    for (const topic of event.topics) {
        console.log('  ' + topic.topic);
    }
    return true;
}

/**
 * Sends an email informing the specified member of the specified events.
 * @param {String} address the member's email address
 * @param {Array<Object>} events the interesting events (from Mongo)
 */
async function sendEmail(address, events) {
    await emailTransport.sendMail({
        from: 'Member-Meeting Matcher <' + senderAddress + '>',
        to: address,
        subject: 'ACM meetings you may be interested in',
        text: 'Test!', // TODO!
        html: template({events: events})
    });
}
