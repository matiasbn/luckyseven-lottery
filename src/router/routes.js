/* eslint-disable import/prefer-default-export */
import Landing from '@/views/Landing';
import Rules from '@/views/Rules';
import HowNumbersGenerate from '@/views/HowNumbersGenerate';
import Lottery from '@/views/Lottery';
import GameStats from '@/views/GameStats';
import UserDashboard from '@/views/UserDashboard';

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
