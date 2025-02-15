<template>
    <v-container>
        <v-card class="v-card pa-6 mx-auto mt-15" max-width="350">
            <RegisterForm @registerUser="register">

            </RegisterForm>
        </v-card>
    </v-container>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';


export default {
    components: {
        RegisterForm
    },
    methods: {
        register(registerUser) {
            console.log(registerUser)
        },
    },
}
</script>