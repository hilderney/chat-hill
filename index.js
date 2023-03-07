import { inputRobot } from './robots/input.js';
import { textRobot } from './robots/text.js';

const robots = {
  input: inputRobot,
  text: textRobot,
}

async function start() {
  console.log('Iniciando...');

  let content = {
    goal: '',
    genre: '',
    theme: '',
    category: '',
    sinopsis: {
      sourceContent: '',
      sanitizedContent: '',
      sentences: []
    },
    sentences: [],
    characters: [],
    worldBuilding: {
      directives: '',
      genre: '',
      magicSystem: '',
    },
    maxSentences: 5,
  };

  await robots.input(content);
  await robots.text(content);

  // console.log(content);
  console.log('Finalizando...');
}

start();