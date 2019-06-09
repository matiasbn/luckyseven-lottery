/* eslint-disable import/prefer-default-export */
import Landing from '../components/Landing';
import Rules from '../components/Rules';
import HowNumbersGenerate from '../components/HowNumbersGenerate';
import GameInfo from '../components/GameInfo';
import PastTickets from '../components/PastTickets';
import PastGames from '../components/PastGames';

export const routes = [
  {
    path: '/',
    component: GameInfo,
  },
  {
    path: '/rules',
    component: Rules,
  },
  {
    path: '/prng',
    component: HowNumbersGenerate,
  },
  {
    path: '/game_info',
    component: Landing,
  },
  {
    path: '/past_games',
    component: PastGames,
  },
  {
    path: '/past_tickets',
    component: PastTickets,
  },
];
