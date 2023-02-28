import { inputRobot } from './robots/input.js';
import { textRobot } from './robots/text.js';

const robots = {
  input: inputRobot,
  text: textRobot
}

async function start() {
  console.log('Iniciando...');

  let content = {
    theme: '',
    category: '',
    sinopsis: '',
  };

  await robots.input(content);
  await robots.text(content);

  console.log(content);
  console.log('Iniciando...');
}

start();