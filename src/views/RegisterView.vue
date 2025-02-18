<template>
    <v-container>
        <v-card class="v-card pa-6 mx-auto mt-15" max-width="350">
            <RegisterForm @registerUser="registerView" :isloading="isloading">

            </RegisterForm>
        </v-card>
        <v-snackbar v-model="showError" color="red" top timeout="3000">
            {{ errorMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
import { register } from '../Service/authService';


export default {
    components: {
        RegisterForm
    },
    data() {
        return {
            isloading: false,
            showError: false,
            errorMessage: "",
        }
    },
    methods: {
        async registerView(registerUser) {

            try {
                const response = await register(registerUser);
                if (response && response.data.validation) {
                    this.isloading = false;
                    this.$router.push('/login');
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.showErrorMessage(error.response.data.errors.email[0]);
                    this.isloading = false;
                } else {
                    this.showErrorMessage("Error en el servidor. Inténtalo más tarde.");
                }
            }
        },
        showErrorMessage(message) {
            this.errorMessage = message;
            this.showError = true;
        }

    },
}
</script>