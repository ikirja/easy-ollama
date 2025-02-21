enum CodeType {
  HTML = 'html',
  CSS = 'css',
  JS = 'javascript',
  JSON = 'json',
  PYTHOM = 'python',
  GO = 'go',
  RUST = 'rust'
}

type CodeSnippet = {
  text: string,
  type: CodeType
}

type CheckObject = {
  type: CodeType,
  slice: number
}

export default function getCodeSnippets(generatedString: string): Array<CodeSnippet> {
  return formatCodeFromGeneratedString(generatedString);
}

function formatCodeFromGeneratedString(generatedString: string): Array<CodeSnippet> {
  const stringArr = generatedString.split('```') || [];
  let responseArr: Array<CodeSnippet> = [];

  stringArr.forEach(string => {
    const codeSnippet = getCodeSnippet(string);

    if (codeSnippet) {
      responseArr.push(codeSnippet);
    }
  });

  return responseArr;
}

function getCodeSnippet(string: string): CodeSnippet | null {
  let type: keyof typeof CodeType;
  for (type in CodeType) {
    const check: CheckObject = {
      type: CodeType[type],
      slice: CodeType[type].length
    };

    if (string.slice(0, check.slice) === check.type) {
      return {
        text: string.slice(check.slice),
        type: check.type
      };
    }
  }

  return null;
}