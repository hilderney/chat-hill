import { keyInSelect, question  } from 'readline-sync';
import Categorias from '../shared/consts/categorias.consts.json' assert { type: "json" };

export async function inputRobot(content) {
  console.log('> [input-robot] Starting...');

  content.theme = await askAndReturnSearchTheme();
  // console.log('> [input-robot] Theme done!');

  content.category = await askAndReturnCategory();
  //  console.log('> [input-robot] Category done!');

  return content;

  async function askAndReturnSearchTheme() {
    return question('Digite algum tema ou termo: ');
  }

  async function askAndReturnCategory() {
    const categories = Categorias;
    const selectedCategoryIndex = keyInSelect(categories, 'Escolha uma opção: ');
    const selectedCategoryText = categories[selectedCategoryIndex];
    return selectedCategoryText;
  }
}