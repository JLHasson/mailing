import type { NextApiRequest, NextApiResponse } from 'next'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData({});
  res.end();
}