export interface EmailProps {
  body: string;
  replyTo: string;
  replyToName?: string;
  to: string;
  toName?: string;
  sender: string;
  senderName?: string;
  subject: string;
  attachmentUrl?: string;
}
