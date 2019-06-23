/* eslint-disable import/prefer-default-export */
import Landing from '../components/Landing';
import Rules from '../components/Rules';
import HowNumbersGenerate from '../components/HowNumbersGenerate';
import Lottery from '../components/Lottery';
import GameStats from '../components/GameStats';
import UserDashboard from '../components/UserDashboard';

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
    path: '/lottery',
    component: Lottery,
  },
  {
    path: '/game_stats',
    component: GameStats,
  },
  {
    path: '/user_dashboard',
    component: UserDashboard,
  },
];
