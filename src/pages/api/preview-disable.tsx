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

export default function previewDisable(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  serverSideRedirect(res, req.headers.referer || '/', 307);
  res.end();
}
