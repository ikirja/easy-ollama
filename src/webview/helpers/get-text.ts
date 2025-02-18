const title = 'Easy-Ollama';
const modelTitle = 'Model selected: ';
const instructions = `
  Use input to the right to write prompt to LLM. Currently we support one prompt for one generated text, without context between requests. No chat support for now.<br />
  Supported models in Ollama: DeepSeek-R1, Llama 3.2. Make sure to run Ollama service, and download any of the supported models.<br />
  You can change model in Settings.<br />
  Press &lt;Send&gt; button to send it. Generated text will appear under input in real-time.<br />
  
`;
const codeSnippetsTitle = 'Code snippets';
const codeSnippetsDesc = `
  After response from LLM has been generated, code snippets from generated text (if there are any) will appear below.<br />
  Press &lt;Copy&gt; button to copy code from corresponding snippet to clipboard.<br />
  Press &lt;Clear Snippets&gt; button to delete all code snippets.
`;

export default function getText() {
  return {
    title,
    modelTitle,
    instructions,
    codeSnippetsTitle,
    codeSnippetsDesc
  };
}