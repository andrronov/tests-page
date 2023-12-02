import { createRouter, createWebHashHistory } from "vue-router";
import store from '../vuex/store.js';

const routes = [
   {
      path: "/", name: "loginComponent",
      component: () => import('../components/loginRegistrationComponent.vue'),
   },
   {
      path: "/home", name: "homePageComponent",
      component: () => import('../components/mainComponent.vue'),
      meta: {isAuthed: store.state.loggedIn}
   },
   {
      path: "/tests", name: "testsListComponent",
      component: () => import('../components/testsListComponent.vue'),
      meta: {isAuthed: store.state.loggedIn}
   },
   {
      path: "/tests-create", name: "createTestComponent",
      component: () => import('../components/createTestComponent.vue'),
      meta: {isAuthed: store.state.loggedIn}
   },
   {
      path: "/tests/:id", name: "test",
      component: () => import('../components/testComponent.vue'),
      meta: {isAuthed: store.state.loggedIn},
      props: true
   },
   {
      path: '/:pathMatch(.*)*', name: "NotFound",
      component: () => import('../components/NotFound.vue')
   }
]

const router = createRouter({
   history: createWebHashHistory(),
   routes,
 });
 
 router.beforeEach((to, from, next) => {
   if(to.meta.isAuthed == false){
      next({path: "/"})
   } else { next() }
 })

 export default router;