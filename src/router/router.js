import { createRouter, createWebHashHistory } from "vue-router";
import store from '../vuex/store.js';
import auth from './middleware/auth.js';
import guest from './middleware/guest.js';
import middlewarePipeline from "./middlewarePipeline.js";

const routes = [
   {
      path: "/", name: "loginComponent",
      component: () => import('../components/loginRegistrationComponent.vue'),
      meta: {middleware: [guest]}
   },
   {
      path: "/home", name: "homePageComponent",
      component: () => import('../components/mainComponent.vue'),
      meta: {middleware: [auth]}
   },
   {
      path: "/tests", name: "testsListComponent",
      component: () => import('../components/testsListComponent.vue'),
      meta: {middleware: [guest, auth]}
   },
   {
      path: "/tests-create", name: "createTestComponent",
      component: () => import('../components/createTestComponent.vue'),
      meta: {middleware: [auth]}
   },
   {
      path: "/tests/:id", name: "test",
      component: () => import('../components/testComponent.vue'),
      meta: {middleware: [auth]},
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
 
//  router.beforeEach((to, from, next) => {
//    if(to.meta.isAuthed == false){
//       next({path: "/"})
//    } else { next() }
//  })
router.beforeEach((to, from, next) => {
   if (!to.meta.middleware) {
       return next()
   }
   const middleware = to.meta.middleware
   const context = {
       to,
       from,
       next,
       store
   }
   return middleware[0]({
       ...context,
       next: middlewarePipeline(context, middleware, 1)
   })
})

 export default router;