const express = require('express');
const rp = require('request-promise');
const $ = require('cheerio');
const cambridgeController = require('./cambridge.controller');
const cambridgeScraping = require('./cambridge.scraping');

const cambridgeRoutes = express.Router();

cambridgeRoutes.get('/:word', async (req, res) => {
  const word = req.params.word;
  let result = await cambridgeController.buscarWordCambridge(word);
  if(!result.length) {
    wordResult = await cambridgeScraping.getWordCambridge(word);
    cambridgeController.crearWordCambridge(wordResult);
  } else {
    wordResult = result.shift();
  }
  delete wordResult.html;
  delete wordResult._id;
  res.json({
    word: wordResult.word,
    graCat: wordResult.graCat,
    uk_pron_text: wordResult.uk_pron_text,
    uk_pron_audio_url: wordResult.uk_pron_audio_url,
    us_pron_text: wordResult.us_pron_text,
    us_pron_audio_url: wordResult.us_pron_audio_url,
    translate: wordResult.translate,
  });
});

module.exports = cambridgeRoutes;
