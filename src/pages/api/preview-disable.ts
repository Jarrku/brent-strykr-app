import { NextApiRequest, NextApiResponse } from 'next';

export default function previewDisable(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.redirect(req.headers.referer || '/');
}
