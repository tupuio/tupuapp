import path from 'path';
import fs from 'fs';
import sendgridEmail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);
}


function sendEmail({recipient, subject, htmlBody, textBody}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid error: SENDGRID_API_KEY is not set');
    return;
  }
  const from = 'mentors@tupu.io'; // Change to your verified sender
  recipient = process.env.DEV_EMAIL_RECIPIENT || recipient;
  subject = buildSubjectLine(subject);
  const msg = {
    to: recipient,
    from: process.env.DEV_EMAIL_RECIPIENT || from, 
    subject: subject,
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

const convertTemplateToTxt = (templateName) => {
  const templateFilename = path.join(resolveTemplatesPath(), `${templateName}.txt`);
  const txtTemplateContent = fs.readFileSync(templateFilename, 'utf8');
  return txtTemplateContent;
}

export const sendPreferencesUpdatedEmail = (recipient, firstName) => {
  const templateName = 'preferences-updated-email';
  const subject = "Your preferences were updated!";
  firstName = firstName.split(" ")[0];
  const preferencesUpdatedEmailTxt = convertTemplateToTxt(templateName)
    .replace(/\[\[firstName\]\]/g, firstName);
  const msg = { 
    recipient: recipient,
    subject: subject,
    htmlBody: preferencesUpdatedEmailTxt.replace(/\n/g, "<br />"),
    textBody: preferencesUpdatedEmailTxt,
  };
  sendEmail(msg);
}

