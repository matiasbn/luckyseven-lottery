/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/views/Landing';
import Rules from '@/views/Rules';
import HowNumbersGenerate from '@/views/HowNumbersGenerate';
import Lottery from '@/views/Lottery';
import GameStats from '@/views/GameStats';
import UserDashboard from '@/views/UserDashboard';
import Login from '@/views/Login';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
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
      meta: { requiresAuth: true },
    },
    {
      path: '/game_stats',
      component: GameStats,
      meta: { requiresAuth: true },
    },
    {
      path: '/user_dashboard',
      component: UserDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: Login,
    },
  ],
  mode: 'history',
});
