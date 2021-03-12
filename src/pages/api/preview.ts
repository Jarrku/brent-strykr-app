import { NextApiRequest, NextApiResponse } from 'next';

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  // Calling setPreviewData sets a preview cookies that turn on the preview mode.
  // Any requests to Next.js containing these cookies will be seen as preview mode,
  // and the behavior for statically generated pages will change.
  const { page } = req.query;

  if (typeof page === 'string') {
    res.setPreviewData({});

    res.redirect(page);
  } else {
    return res.status(401).json({ message: 'Invalid page parameter' });
  }
}
