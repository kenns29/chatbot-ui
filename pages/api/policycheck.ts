import { OPENAI_API_HOST, OPENAI_API_TYPE, OPENAI_API_VERSION, OPENAI_ORGANIZATION } from '@/utils/app/const';

import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const url = `${OPENAI_API_HOST}/v1/check/policy`;
    const res = await fetch(url, {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
    })
    const json = await res.json();
    if (!json.message) {
      return new Response(JSON.stringify({'message': 'no policy check result'}), { status: 200 });
    }
    return new Response(JSON.stringify(json), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;