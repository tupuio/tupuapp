import path from 'path';
import fs from 'fs';
import sendgridEmail from '@sendgrid/mail';
import mjml2html from "mjml";

const TUPU_EMAIL = 'mentors@tupu.io'; // Change to your verified sender

if (process.env.SENDGRID_API_KEY) {
  sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);
}


function sendEmail({recipient, subject, htmlBody, textBody}) {
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
  const msg = {
    to: recipient,
    from, 
    subject,
    text: textBody,
    html: htmlBody,
  };
  sendgridEmail
    .send(msg)
    .then(() => {
      console.log(`Email sent to SendGrid for <${recipient}>,\n subject "${subject}"`);
    })
    .catch((error) => {
      console.error('SendGrid error:', error)
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
  sendNotificationEmail(recipient, subject, emailTitle, preferencesUpdatedEmailTxt);  
}

const sendNotificationEmail = (recipient, subject, emailTitle, emailTxt) => {
  const emailHTML = createNotificationHTMLEmail(emailTitle, emailTxt);
  const msg = { 
    recipient: recipient,
    subject: subject,
    htmlBody: emailHTML,
    textBody: emailTxt,
  };
  sendEmail(msg);
}

export const sendMentorshipRequestedEmail = (mentorshipRequest) => {
  const { mentee, mentor, messageRequest, longTerm } = mentorshipRequest;
  // mentee and mentor = { name: "", email: "" }
  const templateName = 'mentorship-requested-email';
  const emailTitle = "New Mentorship request!";
  const subject = "New Mentorship request!";
  const longOrShortTerm = (longTerm ? "long":"short") + " term";

  const users = [["mentee", mentee.email], ["mentor", mentor.email], ["tupu", TUPU_EMAIL]];
  for (const user of users) {
    const [userType, userEmail] = user;
    console.log("writing to", userEmail, "as", userType);
    const emailTxt = loadTXTTemplate(`${templateName}-${userType}`)
      .replace(/\[\[menteeFirstName\]\]/g, mentee.name)
      .replace(/\[\[mentorFirstName\]\]/g, mentor.name)
      .replace(/\[\[menteeMessageRequest\]\]/g, messageRequest)
      .replace(/\[\[longOrShortTerm\]\]/g, longOrShortTerm);
    sendNotificationEmail(userEmail, subject, emailTitle, emailTxt);
  }
}
