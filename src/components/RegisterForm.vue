<template>
  <v-form ref="form" v-model="isValid" lazy-validation @submit.prevent="submitFormRegister">
    <v-col>
      <h2>Registrarse</h2>
      <v-card-text>
        <v-text-field v-model="user.name" :rules="[rules.required]" outlined label="Nombre" required></v-text-field>

        <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" outlined label="Correo Electrónico"
          required></v-text-field>

        <v-text-field v-model="user.password" :rules="[rules.required, rules.min(6)]" outlined label="Contraseña"
          type="password" required></v-text-field>

        <v-btn type="submit" :disabled="!isValid" class="mt-2" color="primary" block>
          Registrarse
        </v-btn>
      </v-card-text>
    </v-col>

    <v-card-actions class="justify-center">
      <router-link to="/login" class="login-link"> ¿Tienes una cuenta existente? </router-link>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      isValid: true, 
      user: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        required: (value) => !!value || 'Este campo es obligatorio',
        email: (value) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || 'Correo electrónico inválido';
        },
        min: (min) => (value) =>
          (value && value.length >= min) || `Debe tener al menos ${min} caracteres`,
      },
    };
  },
  methods: {
    submitFormRegister() {
      if (this.$refs.form.validate()) {
        this.$emit('registerUser', {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        });
      }
    },
    navigateToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style >
.login-link {
  color: #1976d2;
  text-decoration: none;
  font-weight: bold;
}

</style>
