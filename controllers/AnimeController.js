import puppeteer from 'puppeteer';

// Base URL
const url = 'https://samehadaku.win/';

export const getRecentEpisodes = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const liElements = await page.$$('#main > div:nth-child(11) > div.post-show > ul > li ');
    let recentEpisodes = [];
    await Promise.all(
      liElements.map(async (div) => {
        const h1 = await page.evaluate((el) => el.querySelector('div.dtla > h2').textContent, div);
        const imgSrc = await page.evaluate((el) => el.querySelector('div.thumb > a > img').getAttribute('src'), div);
        const realeseAt = await page.evaluate(
          (el) =>
            el
              .querySelector('div.dtla > span:nth-child(4)')
              .textContent.toString()
              .replace(/  Released/g, 'Released'),
          div
        );
        recentEpisodes.push({ title: h1, imageThumb: imgSrc, realeseAt });
      })
    );

    await browser.close();
    res.status(200).json({ status: 'Succesfully', recentEpisodes });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://samehadaku.win/');

//   //   const selector = await page.waitForSelector('#main > div:nth-child(11) > div.post-show > ul > li');
//   //   #main > div:nth-child(11) > div.post-show > ul > li:nth-child(1) > div.dtla > h2 > a
//   //   #main > div:nth-child(11) > div.post-show > ul > li:nth-child(1) > div.thumb > a > img
//   //   #main > div:nth-child(11) > div.post-show > ul > li:nth-child(1) > div.dtla > span:nth-child(4)
//   //   const title = await textSelector.evaluate((el) => el.textContent);

//   const a = await page.$$('#main > div:nth-child(11) > div.post-show > ul > li ');
//   let liContents = [];
//   await Promise.all(
//     a.map(async (div) => {
//       const h1 = await page.evaluate((el) => el.querySelector('div.dtla > h2').textContent, div);
//       const imgSrc = await page.evaluate((el) => el.querySelector('div.thumb > a > img').getAttribute('src'), div);
//       const realeseAt = await page.evaluate(
//         (el) =>
//           el
//             .querySelector('div.dtla > span:nth-child(4)')
//             .textContent.toString()
//             .replace(/  Released/g, 'Released'),
//         div
//       );
//       liContents.push({ title: h1, imageThumb: imgSrc, realeseAt });
//     })
//   );
//   console.log(liContents);
//   //   #player_embed > div > iframe

//   await page.goto('https://samehadaku.win/boruto-episode-286/');
//   const selector = await page.waitForSelector('#player_embed > div > iframe');

//   const result = await selector.evaluate((el) => el.getAttribute('src'));

//   console.log(result);
//   await browser.close();
// })();
