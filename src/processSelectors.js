const html = require("../lib/html");

const processSelector = async (selector, delay, context, results) => {
  console.log("processing: " + selector.title);

  const ourContext = { ...context };
  const selected = context.$(selector.selector, selector.parentElem);

  // todo: figure out how we're gonna handle multiple: true

  switch (selector.type) {
    case "element":
      if (selector.multiple) {
        ourContext.parentElem = selected;
      } else {
        ourContext.parentElem = selected;
      }
      break;
    case "link":
      break;
    case "text":
      ourContext.outputRow[selector.selector] = selected.text();
      break;
    default:
      break;
  }

  // recursively go through the children if there are any
  if (selector.children && selector.children.length > 0) {
    selector.children.forEach(async child => {
      if (!child.multiple) {
        await processSelector(child, delay, context, results);
      } else {
        const childContext = { ...context };
        await processSelector(child, delay, childContext, results);
      }
    });
  }

  results.push(ourContext.outputRow);

  // wait before processing the next one
  await new Promise(resolve => setTimeout(resolve, delay));
};

module.exports = async (selectors, url, delay, results) => {
  const startPage = await html.parse(url);
  const initialContext = {
    $: startPage,
    parentElem: null,
    outputRow: {
      startUrl: url
    }
  };

  selectors.forEach(async selector => {
    processSelector(selector, url, delay, initialContext, results);
  });
};
