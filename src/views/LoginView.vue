<template>
    <v-container class="">
        <v-card class="pa-5 v-card mx-auto mt-15" max-width="350">
            <LoginForm @login=loginView :isloading="isloading">
            </LoginForm>
        </v-card>
        <v-snackbar v-model="showError" color="red" top timeout="3000">
            {{ errorMessage }}
        </v-snackbar>
    </v-container>
</template>

<style scoped>
.v-card {
    border-radius: 10px;
}
</style>

<script>
import LoginForm from '../components/LoginForm.vue';
import { login } from '../Service/authService';

export default {

    name: 'LoginView',
    components: {
        LoginForm
    },

    data() {
         // Define las propiedades que recibe el componente
        return {
            isloading: false,
            showError: false,
            errorMessage: "",
        }
    },
    methods: {
        //metodo para hacer login en la aplicacion
        async loginView(loginData) {

            try {
                this.isloading = true;
                const response = await login(loginData);
                if (response && response.data.validation) {
                    localStorage.setItem("token", response.data.access_token)
                    this.$root.$emit("loginSuccess");
                    this.$router.push('/todoView');
                }
            } catch (error) {
                if (error.response) {
                    this.isloading = false;
                    this.showErrorMessage(error.response.data.errors.message[0]);
                } else {
                    this.showErrorMessage("Error en el servidor. Inténtalo más tarde.");
                }
            }
        },
        //metodo para mostrar mensaje de error
        showErrorMessage(message) {
            this.errorMessage = message;
            this.showError = true;
        }

    },
}
</script>