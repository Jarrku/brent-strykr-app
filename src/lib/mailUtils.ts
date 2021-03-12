import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
  SendSmtpEmailTo,
  SendSmtpEmailSender,
  SendSmtpEmailReplyTo,
  SendSmtpEmailAttachment,
} from 'sib-api-v3-typescript';
import { EmailProps } from './types';

const smtpApi = new TransactionalEmailsApi();
smtpApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY);

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
  const smtpEmail = new SendSmtpEmail();

  smtpEmail.to = [createReceiver(to, toName)];
  smtpEmail.sender = createSender(sender, senderName);
  smtpEmail.subject = subject;
  smtpEmail.replyTo = createReplyTo(replyTo, replyToName);
  smtpEmail.textContent = body;
  smtpEmail.attachment = attachmentUrl ? [createAttachment(attachmentUrl)] : undefined;

  return smtpApi.sendTransacEmail(smtpEmail);
}

function createSender(email: string, name?: string) {
  const sender = new SendSmtpEmailSender();
  sender.email = email;
  sender.name = name;
  return sender;
}

function createReceiver(email: string, name?: string) {
  const receiver = new SendSmtpEmailTo();
  receiver.email = email;
  receiver.name = name;
  return receiver;
}

function createReplyTo(email: string, name?: string) {
  const receiver = new SendSmtpEmailReplyTo();
  receiver.email = email;
  receiver.name = name;
  return receiver;
}

function createAttachment(url: string) {
  const attachment = new SendSmtpEmailAttachment();
  attachment.url = url;
  return attachment;
}
