<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="text">To Do</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" text @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else text @click="login">
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-snackbar v-model="showError" color="red" top timeout="3000">
        {{ errorMessage }}
      </v-snackbar>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { logout } from './Service/authService';

export default {
  name: 'App',
  data() {
    return {
      errorMessage: "",
      showError: false,
      isLoggedIn: false,
    };
  },
  created() {
    this.$root.$on("loginSuccess", () => {
      this.checkAuth();
    });
  },
  methods: {
    checkAuth() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    async logout() {

      try {
        const response = await logout();

        if (response && response.data) {
          localStorage.removeItem("token");
          this.isLoggedIn = false;
          this.$router.push('/login');
        }
      } catch (error) {
        if (error.response) {
          this.showErrorMessage(error.response.data.errors.message[0]);
        }
      }
    },
    login() {
      this.$router.push('/login');
    },
    showErrorMessage(message) {
      this.errorMessage = message;
      this.showError = true;
    }
  },

};
</script>
