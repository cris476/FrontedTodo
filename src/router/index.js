import Vue from "vue";
import VueRouter from "vue-router";
import TodoView from "@/views/TodoView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history", // Usa 'history' para URLs sin #
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/todoView",
      name: "todoView",
      component: TodoView,
    },
  ],
});

export default router;
