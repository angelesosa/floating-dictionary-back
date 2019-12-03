const rp = require('request-promise');
const $ = require('cheerio');
const logger = require('../lib/logger');
const CambridgeScrapingError = require('./cambridge.error').CambridgeScrapingError;
require('../lib/dotenv');

class CambridgeScraping {
  constructor() {}

  static async getWordCambridge(wordStr) {
    const url = process.env.URL_CAMBRIGDE_SEARCH;
    const media = process.env.URL_CAMBRIGDE_MEDIA;
    logger.error('Scraping-URL', `${url}${wordStr}`);
    const result = await rp(`${url}${wordStr}`)
      .then(html => {
        //success!
        const firstResult = $('div.pr.entry-body__el', html).html();
        let graCatLst = [];
        $('span.pos.dpos', firstResult).each((i, element) => {
          graCatLst.push($(element).text());
        });
        // attr('src')
        const obj = {
          word: $('span.hw.dhw', firstResult).text(),
          graCat: graCatLst.join(', '),
          uk_pron_text: $('span.uk.dloc', firstResult)
            .next()
            .text(),
          uk_pron_audio_url: `${media}${$('span.uk.dloc', firstResult)
            .find('source')
            .eq(0)
            .attr('src')}`,
          us_pron_text: $('span.us.dloc', firstResult)
            .next()
            .text(),
          us_pron_audio_url: `${media}${$('span.us.dloc', firstResult)
            .find('source')
            .eq(0)
            .attr('src')}`,
          translate: `${$('div.def-block.ddef_block', firstResult)
            .find('span.trans.dtrans.dtrans-se')
            .eq(0)
            .text().trim()}`,
          html
        };
        return obj;
      })
      .catch(function(err) {
        logger.error('Scraping', JSON.stringify(err));
        throw new CambridgeScrapingError(`Ocurrio un error al buscar la palabra: ${wordStr}`);
      });
    return result;
  }
}

module.exports = CambridgeScraping;
