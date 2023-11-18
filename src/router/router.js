import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
   {
      path: "/",
      name: "homePageComponent",
      component: () => import('../components/mainComponent.vue'),
   },
   {
      path: "/tests",
      name: "testsListComponent",
      component: () => import('../components/testsListComponent.vue'),
   },
   {
      path: "/tests/:id",
      name: "test",
      component: () => import('../components/testComponent.vue'),
      props: true
   }
]

const router = createRouter({
   history: createWebHashHistory(),
   routes,
 });
 
 export default router;