import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
   {
      path: "/", name: "loginComponent",
      component: () => import('../components/loginRegistrationComponent.vue'),
   },
   {
      path: "/home", name: "homePageComponent",
      component: () => import('../components/mainComponent.vue'),
   },
   {
      path: "/tests", name: "testsListComponent",
      component: () => import('../components/testsListComponent.vue'),
   },
   {
      path: "/tests-create", name: "createTestComponent",
      component: () => import('../components/createTestComponent.vue'),
   },
   {
      path: "/tests/:id", name: "test",
      component: () => import('../components/testComponent.vue'),
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
 
 export default router;