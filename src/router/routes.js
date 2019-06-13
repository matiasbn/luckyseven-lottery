/* eslint-disable import/prefer-default-export */
import Landing from '../components/Landing';
import Rules from '../components/Rules';
import HowNumbersGenerate from '../components/HowNumbersGenerate';
import GameInfo from '../components/GameInfo';
import PastGames from '../components/PastGames';
import UserDashboard from '../components/UserDashboard';
import { store } from '../store';

export const routes = [
  {
    path: '/',
    component: Landing,
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
    path: '/current_game',
    component: GameInfo,
  },
  {
    path: '/past_games',
    component: PastGames,
    beforeRouteEnter(to, from, next) {
      store.dispatch('updatePastGames');
      next();
    },
  },
  {
    path: '/user_dashboard',
    component: UserDashboard,
  },
];
