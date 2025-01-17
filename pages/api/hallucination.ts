import { OPENAI_API_HOST, OPENAI_API_TYPE, OPENAI_API_VERSION, OPENAI_ORGANIZATION } from '@/utils/app/const';

import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const reqJSON = await req.json();
    const question = reqJSON.question ?? '';
    const answer = reqJSON.answer ?? '';
    const prompt = reqJSON.prompt ?? '';
    const url = `${OPENAI_API_HOST}/v1/check/hallucination`;
    const res = await fetch(url, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({question, answer, prompt})
    })
    const json = await res.json();

    return new Response(JSON.stringify(json), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
