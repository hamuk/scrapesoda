module.exports = {
  validate: config => {
    if (!config.title) {
      throw new Error("no title in config file");
    }

    if (!config.url) {
      throw new Error("no url in config file");
    }

    if (!config.start) {
      throw new Error("no start in config file");
    }
  },
  default: title => ({
    title,
    url: "https://en.wikipedia.org/wiki/Main_Page",
    delay: 200,
    start: {
      title: "portal link",
      type: "nav",
      selector: "> li > a",
      multiple: true,
      children: [
        {
          title: "portal first heading",
          type: "text",
          selector: "#firstHeading"
        }
      ]
    }
  })
};
