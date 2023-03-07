import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import Authenticator from 'openai-authenticator';
import dotenv from 'dotenv';
import { oraPromise } from 'ora';
import sentencBoundaryDetection from 'sbd';

dotenv.config();

export async function textRobot(content) {
  await fetchChatGpt(content);
  await sanitizeContent(content);
  await breakIntoSentences(content);
  await limitMaxSentences(content);

  async function limitMaxSentences(content) {
    console.log('Maximo de Sentenças: ', content.maxSentences);
    // content.sentences = sontent.sentences.slice(0, content.maxSentences);
  }

  async function fetchChatGpt(content) {
    const authenticator = new Authenticator();
    const apiToken = await authenticator.login(process.env.OPENAI_EMAIL, process.env.OPENAI_PASSWORD);
    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: apiToken.accessToken,
      debug: false
    });
    // const api = new ChatGPTAPI({
    //   apiKey: process.env.OPENAI_ACCESS_TOKEN
    // })

    let prompt = '';

    if (content.goal === 'Manwhua') {
      prompt = `Escreva um resumo de uma possível história de um "Manhua" (Mangá Coreano) sobre o tema "${content.theme}", no genero de ${content.genre}`;
    } else {
      prompt = `Escreva uma aventura de "RPG" (Role Playeng Game) com o tema "${content.theme}", no genero de ${content.genre}`
    }

    const res = await oraPromise(api.sendMessage(prompt), {
      text: prompt
    });

    // console.log('\n' + res.text + '\n');
    content.sinopsis.sourceContent = res.text;
  }

  async function sanitizeContent(content) {
    const withoutBlankLines = removeBlankLines(content.sinopsis.sourceContent);
    content.sinopsis.sanitizedContent = withoutBlankLines.join(' ');

    function removeBlankLines(str) {
      const allLines = str.split('\n');
      const allLinesWithoutBlank = allLines.filter(line => line.length > 0);
      return allLinesWithoutBlank;
    }
  }

  async function breakIntoSentences(content) {
    const sentences = sentencBoundaryDetection.sentences(content.sinopsis.sanitizedContent);

    sentences.forEach(sentence => {
      const sentenceObject = {
        text: sentence,
        keywords: [],
        images: []
      };
      content.sinopsis.sentences.push(sentenceObject);
    });
  }

}
