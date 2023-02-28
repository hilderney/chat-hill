import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import Authenticator from "openai-authenticator";
import dotenv from "dotenv";
import { oraPromise } from 'ora';

dotenv.config();

export async function textRobot(content) {
  const authenticator = new Authenticator();

  const apiToken = await authenticator.login(process.env.OPENAI_EMAIL, process.env.OPENAI_PASSWORD);

  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: apiToken.accessToken,
    debug: false
  });

  // const api = new ChatGPTAPI({
  //   apiKey: process.env.OPENAI_ACCESS_TOKEN
  // })

  const prompt = `Escreva um resumo de uma possível história de um "Manhua" sobre o tema ${content.theme}, no estilo ou categoria de ${content.category}`;

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  });

  // console.log('\n' + res.text + '\n');

  content.sinopsis = res.text;
}
