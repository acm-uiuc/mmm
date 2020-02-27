# Motivation

One of the biggest pain points of ACM is the decentralized nature of SIG information, especially
meetings. With over 20 SIG’s and 1000’s of members in ACM, it is impossible to keep up to date
on each SIG’s events and focuses on a regular basis. By consolidating some of this information,
SIG’s can gain better visibility and traction from the broader ACM student population. By
maintaining a centralized database of relevant keywords or topics for each SIG, as well as an up
to date schedule of meetings and topics, we can make a significant step towards achieving this
goal.


# Design Overview

## Phase 1

The most user friendly implementation would involve an addition to the ACM @ Illinois
website that would allow SIG’s to enter their meeting schedules and the associated metadata.
SIG chairs would be expected to login weekly to update their meeting schedules, and then a
separate calendar page would be made available to the general public with all the SIG meetings
listed.

## Phase 2

Once the above is integrated and adopted by SIG’s, we can then use this metadata to
proactively reach out to ACM members that would potentially be interested in specific SIG’s or
SIG meetings. We already collect information on which SIG’s members are interested in when
they fill out the membership form on our website. However, we also maintain a resume book that
any member is welcome to submit their resume to. By cross-referencing the metadata we collect
on SIG meetings with the keywords found in member’s resumes, we can intelligently recommend
meetings for them to attend on an ongoing basis. Out of respect for member privacy, we would
need to assert that they consent to this service by explicitly opting in through the ACM website.


# Implementation Details

## Phase 1

There are three key aspects here, namely, the entry, storage, and presentation of
meeting times.

- Entry: Simple web form on the ACM website that allows the entry of basically event/calendar
information, as well as a list of keywords. Ideally this would require login via Groot from SIG
chairs/designated individuals to enter the information. For ease of use, previously entered
information could be saved for quick copying to the next week.

- Storage: The choice of database is not important for this simple of an application. Amazon
DynamoDB could be a good route due to AWS’s generous free tier. Special care will need to be
taken to normalize the keywords/tags into a generally query-able format. I.E. Node.js,
JavaScript, and JS should all map to the same keyword.

- Presentation: The events would be displayed in a public page on the ACM website. Open
source JavaScript Calendar libraries like FullCalender could handle this great.

## Phase 2
There are three key aspects here, namely, parsing and filtering resumes for keywords,
matching members to events on a rolling basis, and then notifying them of events.

- Parsing and Filtering: This will only happen when a member uploads their resume. The
keywords will be parsed and then stored in a database to be indexed on in the future. Open
source resume parsers exist, and we would need to experiment with what is out there and
available. There are 2 options for storing the data from this. The first, being to create a table of
users each with a list of keywords. The other option being to store a table of keywords each
with a list of users. Since we will be querying based on keywords from events, the latter makes
the most sense.

- Matching Members: Each time an event is added by a SIG, the backend will filter the members
table based on each of the tags for the event, and then form a list of users that may be
interested in the event. This event driven processing can be handled via DynamoDB streams
and AWS Lambda triggers.

- Notifications: The most logical route is to email the member which events may be interesting to
them. To avoid spamming them each time an event is posted, this can be done in batch on
weekly/twice-weekly intervals. This will require storing event matches in a queue for each user.
Legitimate message queues would be overkill for this, the same effect can be achieved with a
database.


# Technical Nuances

- As DynamoDB does not support fully ACID (Atomic, Consistent, Idempotent, Durable)
compliant transactions, special care must be taken on list update operations within rows so as
to not lose data in the case of race conditions. Consider using the version attribute as a
workaround.
- As members graduate we need a way of clearing them from the database to save resources.
Hacky workaround would be to reset the tables at the start of each academic year, when
member’s update their resumes.
