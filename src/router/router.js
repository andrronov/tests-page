import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
   {
      path: "/", name: "loginComponent",
      component: () => import('../components/loginRegistrationComponent.vue')
   },
   {
      path: "/home", name: "homePageComponent",
      component: () => import('../components/mainComponent.vue'),
      meta: {authReq: true}
   },
   {
      path: "/tests", name: "testsListComponent",
      component: () => import('../components/testsListComponent.vue')
   },
   {
      path: "/tests-create", name: "createTestComponent",
      component: () => import('../components/createTestComponent.vue'),
      meta: {authReq: true}
   },
   {
      path: "/tests/:id", name: "test",
      component: () => import('../components/testComponent.vue'),
      meta: {authReq: true},
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

router.beforeEach((to, from) => {
   console.log(localStorage.getItem('isLogged'))
   if(to.meta.authReq && !localStorage.getItem('isLogged')){
      console.log('login err')
      return {
         path: '/',
         // save the location we were at to come back later
         query: { redirect: to.fullPath },
       }
   }
})

 export default router;