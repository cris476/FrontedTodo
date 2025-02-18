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
  // Define las propiedades que recibe el componente
  data() {
    return {
      errorMessage: "",
      showError: false,
      isLoggedIn: false,
    };
  },
  // Define los datos del componente
  created() {
    // Verifica si el usuario está autenticado
    this.$root.$on("loginSuccess", () => {
      this.checkAuth();
    });
  },
  methods: {
    // Verifica si el usuario está autenticado
    checkAuth() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    // Cierra la sesión del usuario
    async logout() {

      try {
        const response = await logout();

        if (response && response.data) {
          // Elimina el token del local storage
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
    // Redirige al usuario a la página de login
    login() {
      this.$router.push('/login');
    },
    // Muestra un mensaje de error
    showErrorMessage(message) {
      this.errorMessage = message;
      this.showError = true;
    }
  },

};
</script>
