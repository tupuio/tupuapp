import path from 'path';
import fs from 'fs';
import sendgridEmail from '@sendgrid/mail';
import mjml2html from "mjml";
import { RequestStatusEnum } from "../../types/dbTablesEnums";

const TUPU_EMAIL = 'mentors@tupu.io'; // used for tupu add team recipient

if (process.env.SENDGRID_API_KEY) {
  sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);
}


function sendEmail({ recipient, subject, htmlBody, textBody, replyTo }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid error: SENDGRID_API_KEY is not set');
    return;
  }
  if (!process.env.SENDGRID_EMAIL_VERIFIED_SENDER) {
    console.error('SendGrid error: SENDGRID_EMAIL_VERIFIED_SENDER is not set');
    return;
  }
  const from = process.env.SENDGRID_EMAIL_VERIFIED_SENDER;
  recipient = process.env.DEV_EMAIL_RECIPIENT || recipient;
  subject = buildSubjectLine(subject);
  let msg = {
    to: recipient,
    from,
    subject,
    text: textBody,
    html: htmlBody,
  };
  if (replyTo) {
    msg = { replyTo, ...msg };
  }
  sendgridEmail
    .send(msg)
    .then(() => {
      console.log(`Email sent to SendGrid for <${recipient}>,\n subject "${subject}"`);
    })
    .catch((error) => {
      console.error('SendGrid error:', error)
      console.error('SendGrid error:', error.response.body);
      console.error(`Could not deliver email to <${recipient}>,\n subject "${subject}"`);
    });
}

const buildSubjectLine = (subject) => {
  const dev_prefix = process.env.DEV_EMAIL_RECIPIENT ? "[DEBUG] " : "";
  const prefix = "[TUPU] ";
  return `${dev_prefix}${prefix}${subject}`;
}

const resolveTemplatesPath = () => {
  return path.resolve(process.cwd(), 'utils', 'email', 'templates');
}

const loadHTMLTemplate = (templateName) => {
  const templatesPath = resolveTemplatesPath();
  const templateFilename = path.join(templatesPath, `${templateName}.mjml`);
  const mjmlTemplateContent = fs.readFileSync(templateFilename, 'utf8');
  const parsedTemplate = mjml2html(mjmlTemplateContent, {
    filePath: templatesPath,
  });
  return parsedTemplate.html;
}

// load the HTML template for the notifications
const tupuAppNotificationEmailHTML = () => loadHTMLTemplate('tupu-app-notification');

const loadTXTTemplate = (templateName) => {
  const templateFilename = path.join(resolveTemplatesPath(), `${templateName}.txt`);
  const txtTemplateContent = fs.readFileSync(templateFilename, 'utf8');
  return txtTemplateContent;
}

const createNotificationHTMLEmail = (emailTitle, emailText) => {
  const notificationBodyHTML = `<p>${emailText.replace(/\r?\n|\r/g, "<br />")}</p>`;
  const notificationEmailHTML = tupuAppNotificationEmailHTML()
    .replace(/\[\[NOTIFICATION_BODY\]\]/g, notificationBodyHTML)
    .replace(/\[\[emailTitle\]\]/g, emailTitle);
  return notificationEmailHTML;
}

export const sendPreferencesUpdatedEmail = (recipient, firstName) => {
  const templateName = 'preferences-updated-email';
  const emailTitle = "Tupu App Preferences";
  const subject = "Your preferences were updated!";

  const preferencesUpdatedEmailTxt = loadTXTTemplate(templateName)
    .replace(/\[\[firstName\]\]/g, firstName);
  sendNotificationEmail(recipient, subject, preferencesUpdatedEmailTxt);
}

const sendNotificationEmail = (recipient, subject, emailTxt, replyTo) => {
  const emailHTML = createNotificationHTMLEmail(subject, emailTxt);
  const msg = {
    recipient: recipient,
    subject: subject,
    htmlBody: emailHTML,
    textBody: emailTxt,
    replyTo
  };
  sendEmail(msg);
}

const sendNotificationEmailToUsers = ({
  mentee,
  mentor,
  templateName,
  subject,
  fillInFieldsFn,
  replyTo
}) => {
  const recipients = [["mentee", mentee.email], ["mentor", mentor.email], ["tupu", TUPU_EMAIL]];
  for (const recipient of recipients) {
    const [userType, userEmail] = recipient;
    console.log("writing to", userEmail, "as", userType);
    const emailTxt = fillInFieldsFn(loadTXTTemplate(`${templateName}-${userType}`))
    sendNotificationEmail(userEmail, subject, emailTxt, replyTo);
  }
}

const buildLongOrShortTermLabel = (longTerm) => (longTerm ? "long" : "short") + " term";

const buildReasonString = (requestStatus) => {
  switch (requestStatus) {
    case RequestStatusEnum.Rejected:
      return "While we do not know the reason, we're sure it's nothing personal.";
    case RequestStatusEnum.RejectedBusy:
      return "This period might be not the right one.";
    case RequestStatusEnum.RejectedNoGoodFit:
    default:
      return "There could be another mentor that might be a better fit.";
  }
};

export const sendMenteeMentorshipClosedEmail = ({ mentee, mentor, menteeFeedback, }) => {
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentee-mentorship-closed-email',
    subject: "Mentorship closed",
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[menteeFeedback\]\]/g, menteeFeedback);
    }
  };
  sendNotificationEmailToUsers(params);
}

export const sendMentorContactMenteeEmail = ({ mentee, mentor, mentorMessage }) => {
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentor-contact-mentee-email',
    subject: "New message from a mentor",
    replyTo: mentor.email,
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[mentorMessage\]\]/g, mentorMessage);
    }
  };
  sendNotificationEmailToUsers(params);
}

export const sendMentorMentorshipClosedEmail = ({ mentee, mentor, mentorFeedback, }) => {
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentor-mentorship-closed-email',
    subject: "Mentorship closed",
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[mentorFeedback\]\]/g, mentorFeedback);
    }
  };
  sendNotificationEmailToUsers(params);
}

export const sendMentorshipRequestAcceptedEmail = ({ mentee, mentor, longTerm }) => {
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentorship-request-accepted-email',
    subject: "Mentorship accepted!",
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[longOrShortTerm\]\]/g, buildLongOrShortTermLabel(longTerm));
    }
  };
  sendNotificationEmailToUsers(params);
}

export const sendMentorshipRequestCancelledEmail = ({ mentee, mentor, longTerm }) => {
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentorship-request-cancelled-email',
    subject: "Mentorship request cancelled!",
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[longOrShortTerm\]\]/g, buildLongOrShortTermLabel(longTerm));
    }
  };
  sendNotificationEmailToUsers(params);
}
export const sendMentorshipRequestRejectedEmail = ({ mentee, mentor, longTerm, requestStatus }) => {
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentorship-request-rejected-email',
    subject: "Mentorship rejected :(",
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[reason\]\]/g, buildReasonString(requestStatus))
        .replace(/\[\[longOrShortTerm\]\]/g, buildLongOrShortTermLabel(longTerm));
    }
  };
  sendNotificationEmailToUsers(params);
}

export const sendMentorshipRequestedEmail = (mentorshipRequest) => {
  const { mentee, mentor, messageRequest, longTerm } = mentorshipRequest;
  // mentee and mentor = { name: "", email: "" }
  const params = {
    mentee,
    mentor,
    templateName: 'mentorship-requested-email',
    subject: "New Mentorship request!",
    fillInFieldsFn: (txtTemplate) => {
      return txtTemplate
        .replace(/\[\[menteeName\]\]/g, mentee.name)
        .replace(/\[\[mentorName\]\]/g, mentor.name)
        .replace(/\[\[menteeMessageRequest\]\]/g, messageRequest)
        .replace(/\[\[longOrShortTerm\]\]/g, buildLongOrShortTermLabel(longTerm));
    }
  };
  sendNotificationEmailToUsers(params);
}

export const sendNewUserCreatedEmail = (userId, userEmailAddress) => {
  const newUserTemplate = loadTXTTemplate('new-user-created')

  const emailText = newUserTemplate.replace(/\[\[userId\]\]/g, userId).replace(/\[\[userEmailAddress\]\]/g, userEmailAddress)

  sendNotificationEmail('team@tupu.io', 'New user verification', emailText, '');
}
