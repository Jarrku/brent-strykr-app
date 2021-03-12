// import {
//   TransactionalEmailsApi,
//   TransactionalEmailsApiApiKeys,
//   SendSmtpEmail,
//   SendSmtpEmailTo,
//   SendSmtpEmailSender,
//   SendSmtpEmailReplyTo,
//   SendSmtpEmailAttachment,
// } from 'sib-api-v3-typescript';
import { EmailProps } from './types';
//TODO: Fix when https://github.com/sendinblue/APIv3-typescript-library/issues/16 is merged
const sib = require('sib-api-v3-typescript');

const smtpApi = new sib.TransactionalEmailsApi();
smtpApi.setApiKey(sib.TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY);

export function sendEmail({
  body,
  replyTo,
  replyToName,
  to,
  toName,
  sender,
  senderName,
  subject,
  attachmentUrl,
}: EmailProps) {
  const smtpEmail = new sib.SendSmtpEmail();

  smtpEmail.to = [createReceiver(to, toName)];
  smtpEmail.sender = createSender(sender, senderName);
  smtpEmail.subject = subject;
  smtpEmail.replyTo = createReplyTo(replyTo, replyToName);
  smtpEmail.textContent = body;
  smtpEmail.attachment = attachmentUrl ? [createAttachment(attachmentUrl)] : undefined;

  return smtpApi.sendTransacEmail(smtpEmail);
}

function createSender(email: string, name?: string) {
  const sender = new sib.SendSmtpEmailSender();
  sender.email = email;
  sender.name = name;
  return sender;
}

function createReceiver(email: string, name?: string) {
  const receiver = new sib.SendSmtpEmailTo();
  receiver.email = email;
  receiver.name = name;
  return receiver;
}

function createReplyTo(email: string, name?: string) {
  const receiver = new sib.SendSmtpEmailReplyTo();
  receiver.email = email;
  receiver.name = name;
  return receiver;
}

function createAttachment(url: string) {
  const attachment = new sib.SendSmtpEmailAttachment();
  attachment.url = url;
  return attachment;
}
