<template>
    <v-container class="">
        <v-card class="pa-5 v-card mx-auto mt-15" max-width="350">
            <LoginForm></LoginForm>
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




export default {
    components: {
        LoginForm
    },
    data() {
        return {
            isValid: false,
            user: {
                email: '',
                password: '',
            },
            rules: {
                required: (value) => !!value || 'Este campo es obligatorio',
                email: (value) => {
                    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    return pattern.test(value) || 'Correo electrónico inválido'
                },
                min: (min) => (value) =>
                    (value && value.length >= min) ||
                    `Debe tener al menos ${min} caracteres`,
            },
        }
    },
    methods: {
        login() {
            
        },
    },
}
</script>