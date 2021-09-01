import puppeteer, { Page } from 'puppeteer-core'
import { getOptions } from './chromiumOptions'

let _page: Page | null

const getPage = async (isDev: boolean): Promise<Page> => {
  if(_page){
    return _page
  }

  const options = await getOptions(isDev)
  const browser = await puppeteer.launch(options)

  _page = await browser.newPage()

  return _page
}

export const getScreenShot = async (
  html: string,
  isDev: boolean
): Promise<Buffer> => {
  const page = await getPage(isDev)

  await page.setViewport({ width:1200, height: 630 })
  await page.setContent(html)

  const file = await page.screenshot({type: 'png'})

  return file as Buffer
}