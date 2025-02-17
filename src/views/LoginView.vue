<template>
    <v-container class="">
        <v-card class="pa-5 v-card mx-auto mt-15" max-width="350">
            <LoginForm @login=loginView>


            </LoginForm>
        </v-card>
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
    components: {
        LoginForm
    },
    methods: {
        async loginView(loginData) {

            try {
                console.log(loginData)
                const response = await login(loginData);
                console.log(response)

                if (response && response.data.validation) {
                    localStorage.setItem("token", response.data.access_token)
                    this.$router.push('/todoView');
                }
            } catch (error) {
                console.log(error)
            }
        },

    },
}
</script>