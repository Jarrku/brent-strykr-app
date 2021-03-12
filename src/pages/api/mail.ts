import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/mailUtils';
import { EmailProps } from '@/lib/types';

function isValidString(input: unknown): input is string {
  return typeof input === 'string' && input.length !== 0;
}

function isValidRequest(data: any, res: NextApiResponse): data is EmailProps {
  const { subject, body, to, sender, replyTo } = data as Partial<EmailProps>;

  if (
    !isValidString(subject) ||
    !isValidString(body) ||
    !isValidString(to) ||
    !isValidString(sender) ||
    !isValidString(replyTo)
  ) {
    res
      .status(400)
      .json({ message: 'Invalid request, expects JSON body with subject, body, to, sender and replyTo fields' });
    return false;
  }

  return true;
}

export default async function mail(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  if (isValidRequest(body, res)) {
    try {
      await sendEmail(body);
      res.status(200).json({ status: 'OK' });
    } catch (err) {
      console.error(err);
      res.status(503).json({ errorMessage: 'Failed to send email', error: err });
    }
  }
}
