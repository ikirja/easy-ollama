import ollama from 'ollama';
import { getModel } from '../config';

export function getStreamResponse(prompt: string) {
  return ollama.chat({
    model: getModel(),
    messages:[
      {
        role: 'user',
        content: prompt
      }
    ],
    stream: true
  });
}