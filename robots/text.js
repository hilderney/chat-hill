import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import Authenticator from 'openai-authenticator';
import dotenv from 'dotenv';
import { oraPromise } from 'ora';
import sentencBoundaryDetection from 'sbd';

dotenv.config();

export async function textRobot(content) {
  await fetchChatGpt(content);
  sanitizeContent(content);
  breakIntoSentences(content);
  limitMaxSentences(content);

  function limitMaxSentences(content) {
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
      prompt = `Escreva um resumo de uma possível história de um "Manhua" (Mangá Coreano) sobre o tema ${content.theme}, no genero de ${content.genre}`;
    } else {
      prompt = `Escreva uma aventura de "RPG" (Role Playeng Game) com o tema ${content.theme}, no genero de ${content.genre}`
    }

    const res = await oraPromise(api.sendMessage(prompt), {
      text: prompt
    });

    // console.log('\n' + res.text + '\n');
    content.sinopsis.sourceContent = res.text;
  }

  function sanitizeContent(content) {
    const withoutBlankLines = removeBlankLines(content.sinopsis.sourceContent);
    content.sinopsis.sanitizedContent = withoutBlankLines.join(' ');
    console.log('Conteudo Sanitizado: vvvvvvvvvvvvvvvv', content.sinopsis.sanitizedContent);

    function removeBlankLines(str) {
      const allLines = str.split('\n');
      const allLinesWithoutBlank = allLines.filter(line => line.length > 0);
      return allLinesWithoutBlank;
    }
  }

  function breakIntoSentences(content) {
    console.log('Quebrando em sentenças');
    const sentences = sentencBoundaryDetection.sentences(content.sinopsis.sanitizedContent);
    console.log('Quebrando Sentenças: vvvvvvvvvvvvvvvv', sentences);

    content.sinopsis.sentences = [];

    content.sentences = [
      {
        text: 'examplo 1',
        keywords: ['exemplo'],
        images: ['']
      }
    ];
  }

}
