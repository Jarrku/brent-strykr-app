import { ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Perform a server side redirect
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
function serverSideRedirect(res: ServerResponse, destinationPath: string, statusCode = 301) {
  res.writeHead(statusCode, { Location: destinationPath });
}

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  // Calling setPreviewData sets a preview cookies that turn on the preview mode.
  // Any requests to Next.js containing these cookies will be seen as preview mode,
  // and the behavior for statically generated pages will change.
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  });
  const { page } = req.query;

  if (typeof page === 'string') {
    serverSideRedirect(res, page, 307);
  } else {
    throw Error('page query param not passed!');
  }

  res.end();
}
