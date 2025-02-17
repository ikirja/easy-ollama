enum CodeType {
  HTML = 'html',
  CSS = 'css',
  JS = 'javascript'
}

type CodeSnippet = {
  text: string,
  type: CodeType
}

type CheckObject = {
  text: CodeType,
  slice: number
}

type StringTypes = {
  isHtml: boolean,
  isCss: boolean,
  isJs: boolean
}

const HTML_CHECK: CheckObject = {
  text: CodeType.HTML,
  slice: 4
};

const CSS_CHECK: CheckObject = {
  text: CodeType.CSS,
  slice: 3
};

const JS_CHECK: CheckObject = {
  text: CodeType.JS,
  slice: 10
};

export default function getCodeSnippets(generatedString: string): Array<CodeSnippet> {
  return formatCodeFromGeneratedString(generatedString);
}

function formatCodeFromGeneratedString(generatedString: string): Array<CodeSnippet> {
  const stringArr = generatedString.split('```') || [];
  let responseArr: Array<CodeSnippet> = [];

  stringArr.forEach(string => {
    const { isHtml, isCss, isJs } = checkStringForTypes(string);

    if (!isHtml && !isCss && !isJs) {
      return;
    }

    if (isHtml) {
      responseArr.push({
        text: string.slice(HTML_CHECK.slice),
        type: CodeType.HTML
      });
    }

    if (isCss) {
      responseArr.push({
        text: string.slice(CSS_CHECK.slice),
        type: CodeType.CSS
      });
    }

    if (isJs) {
      responseArr.push({
        text: string.slice(JS_CHECK.slice),
        type: CodeType.JS
      });
    }
  });

  return responseArr;
}

function checkStringForTypes(string: string): StringTypes {
  return {
    isHtml: string.slice(0, HTML_CHECK.slice) === HTML_CHECK.text,
    isCss: string.slice(0, CSS_CHECK.slice) === CSS_CHECK.text,
    isJs: string.slice(0, JS_CHECK.slice) === JS_CHECK.text,
  };
}