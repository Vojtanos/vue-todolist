import { createRouter, createWebHistory } from 'vue-router'

import UsersList from './pages/UsersList.vue'
import TasksList from './pages/TasksList.vue'
import TasksCalendar from './pages/TasksCalendar.vue'
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/calendar' }, //redirecting
    { 
        name: 'calendar',
        path: '/calendar', 
        component: TasksCalendar 
    },
    { 
        path: '/users', 
        component: UsersList 
    },
    { 
        path: '/tasks', 
        component: TasksList 
    },
    { path: '/:notFound(.*)', component: NotFound } //pokud zadáme neplatnou url
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  }
})

export default router
