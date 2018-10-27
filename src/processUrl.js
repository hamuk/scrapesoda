const html = require("../lib/html");

const processSelector = async (selector, delay, context, results) => {
  console.log("processing: " + selector.name);

  const ourContext = { ...context };
  const selected = context.$(selector.selector, selector.parentElem);

  switch (selector.type) {
    case "link": {
      if (selector.multiple) {
        ourContext.currentObject.children = selected.map(n => ({
          value: n.text()
        }));
      } else {
        ourContext.currentObject.value = selected.text();
      }
      break;
    }
    case "value": {
      if (selector.multiple) {
        ourContext.currentObject.children = selected.map(n => ({
          value: n.text()
        }));
      }
      break;
    }
    default:
      break;
  }

  // recursively process child links TODO
  if (
    selector.children &&
    selector.children.length > 0 &&
    selector.type === "link"
  ) {
    for (const child of ourContext.currentObject.children) {
      console.log(child);
    }

    // selector.children.forEach(async child => {
    //   if (!child.multiple) {
    //     await processSelector(child, delay, context, results);
    //   } else {
    //     const childContext = { ...context };
    //     await processSelector(child, delay, childContext, results);
    //   }
    // });
  }

  results.push(ourContext.currentObject);

  // wait before processing the next one
  await new Promise(resolve => setTimeout(resolve, delay));
};

module.exports = async (start, url, delay, results) => {
  const startPage = await html.parse(url);
  const initialContext = {
    $: startPage,
    parentElem: null,
    currentObject: {}
  };

  processSelector(start, delay, initialContext, results);
};
