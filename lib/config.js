module.exports = {
  validate: config => {
    if (!config.title) {
      throw new Error("no title in config file");
    }

    if (!config.url) {
      throw new Error("no url in config file");
    }

    if (!config.selectors && config.selectors.length < 1) {
      throw new Error("no selectors in config file");
    }
  },
  default: title => ({
    title,
    url: "https://en.wikipedia.org/wiki/Main_Page",
    delay: 200,
    selectors: [
      {
        title: "portals container",
        type: "element",
        selector: "#mp-topbanner > ul:nth-child(2)",
        children: [
          {
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
        ]
      }
    ]
  })
};
