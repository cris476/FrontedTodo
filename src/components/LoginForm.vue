<template>
    <v-container>
        <v-form ref="form" lazy-validation @submit.prevent="submitFormLogin">
            <h2>Welcome</h2>
            <v-card-text>
                <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="Correo Electrónico"
                    required outlined></v-text-field>

                <v-text-field v-model="user.password" :rules="[rules.required, rules.min(8)]" label="Contraseña"
                    type="password" required outlined></v-text-field>


                <v-btn type="submit" :disabled="!isValid" class="mt-2" color="primary" block>
                    <v-container v-if="isloading">
                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                    </v-container>
                    <v-container v-else>
                        <div>
                            login
                        </div>
                    </v-container>
                </v-btn>
            </v-card-text>

            <v-card-actions class="justify-center">
                <router-link to="/register" class="styled-link">
                    ¿No tienes una cuenta?
                </router-link>
            </v-card-actions>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "LoginForm",
    // Definición de las propiedades recibidas desde el componente padre
    props: {
        // Validación del formulario
        isloading: {
            typeof: Boolean,
            default: false,
        },
    },
    // Observador para actualizar `localIsloading` cuando `isloading` cambie
    watch: {
        isloading(newValue) {
            this.localIsloading = newValue
        },
    },
    data() {
        return {
            localIsloading: this.isloading,
            user: {
                email: "",
                password: "",
            },
            isValid: true,
            // Reglas de validación de los campos
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
         /**
         * Envía el formulario de login si es válido.
         * Emite un evento con los datos del usuario al componente padre.
         */
        submitFormLogin() {
            const isFormValid = this.$refs.form.validate();
            if (isFormValid) {
                this.localIsloading = true;
                this.$emit("login", {
                    email: this.user.email,
                    password: this.user.password
                });
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
