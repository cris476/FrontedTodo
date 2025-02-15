<template>
    <v-container>
        <v-form ref="form" v-model="isValid" lazy-validation>
            <h2>Welcome</h2>
            <v-card-text>
                <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="Correo Electrónico"
                    required outlined></v-text-field>

                <v-text-field v-model="user.password" :rules="[rules.required, rules.min(6)]" label="Contraseña"
                    type="password" required outlined></v-text-field>

                <v-btn @click="submit" :disabled="!isValid" class="mt-2" color="primary" block>
                    Login
                </v-btn>
            </v-card-text>

            <v-card-actions class="justify-center">
                <router-link to="/register" class="login-link">
                    ¿No tienes una cuenta?
                </router-link>
            </v-card-actions>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            isValid: true,
            user: {
                email: "",
                password: "",
            },
            rules: {
                required: (value) => !!value || "Este campo es obligatorio",
                email: (value) => {
                    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return pattern.test(value) || "Correo electrónico inválido";
                },
                min: (min) => (value) =>
                    (value && value.length >= min) || `Debe tener al menos ${min} caracteres`,
            },
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                console.log("Datos enviados:", this.user);
            }
        },
    },
};
</script>

<style scoped>
.styled-link {
    font-size: 14px;
    color: #6200ea;
    text-decoration: none;
    transition: 0.3s;
}

.styled-link:hover {
    color: #3700b3;
    text-decoration: underline;
}
</style>
