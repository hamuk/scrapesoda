const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  parse: url =>
    axios.get(url).then(
      resp => {
        if (resp.status === 200) {
          const html = resp.data;
          const $ = cheerio.load(html);

          return $;
        }
      },
      error => {
        throw new Error(error.message);
      }
    )
};
