/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '@/views/LandingPage';
import HowWorks from '@/views/HowWorks';
import HowNumbersGenerate from '@/views/HowNumbersGenerate';
import Lottery from '@/views/Lottery';
import GameStats from '@/views/GameStats';
import UserDashboard from '@/views/UserDashboard';
import TicketValidator from '@/views/TicketValidator';
import Historical from '@/views/Historical';
import Login from '@/views/Login';
import player from '@/store/player/';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LandingPage,
    },
    {
      path: '/howworks',
      component: HowWorks,
    },
    {
      path: '/prng',
      component: HowNumbersGenerate,
    },
    {
      path: '/validator',
      component: TicketValidator,
    },
    {
      path: '/lottery',
      component: Lottery,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/game_stats',
      component: GameStats,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user_dashboard',
      component: UserDashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/historical',
      component: Historical,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: Login,
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = player.state.session;
  // const isLoggedIn = true;
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});
