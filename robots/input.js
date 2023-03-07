import { keyInSelect, question  } from 'readline-sync';
import Genres from '../shared/consts/genres.consts.json' assert { type: "json" };

export async function inputRobot(content) {
  console.log('> [input-robot] Starting...');

  content.goal = await askAndReturnGoal();
  content.theme = await askAndReturnSearchTheme();
  content.genre = await askAndReturnGenre();

  return content;

  async function askAndReturnSearchTheme() {
    return question('Digite algum tema ou termo: ');
  }

  async function askAndReturnGenre() {
    const genres = Genres;
    const selectedGenreIndex = keyInSelect(genres, 'Escolha uma opção: ');
    const selectedGenreText = genres[selectedGenreIndex];
    return selectedGenreText;
  }

  async function askAndReturnGoal() {
    const goals = ['Manwhua', 'Aventura de RPG'];
    const selectedGoalIndex = keyInSelect(goals, 'Escolha uma opção: ');
    const selectedGoalText = goals[selectedGoalIndex];
    return selectedGoalText;
  }
}