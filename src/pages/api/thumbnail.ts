import { NextApiRequest, NextApiResponse } from "next"
import { getScreenShot } from "./_lib/chromium"
import getThumbnailTemplate from "./_lib/thumbTemplate"

const isDev = !process.env.AWS_REGION

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const title = String(req.query.title)

    if(! title){
      throw new Error('Title is required')
    }

    const thumbnail_bg = '#121214'

    const html = getThumbnailTemplate(thumbnail_bg, title)

    const file = await getScreenShot( html, isDev)

    // res.setHeader('Content-type', 'text/html')
    res.setHeader('Content-type', 'image/png')
    res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')

    // return res.end(html)
    return res.end(file)

  } catch (error) {
    console.log(error)

    return res.status(500).send('Internal server Error')
  }
}