<template>
  <v-form ref="form" v-model="isValid" lazy-validation @submit.prevent="submitFormLogin">
    <v-col>
      <h2>Registrarse</h2>
      <v-text-field v-model="user.name" :rules="[rules.required]" label="Nombre" required></v-text-field>
      <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="Correo Electrónico"
        required></v-text-field>
      <v-text-field v-model="user.password" :rules="[rules.required, rules.min(6)]" label="Contraseña" type="password"
        required></v-text-field>
      <v-btn  type="submit" :disabled="!isValid" class="mt-3" color="primary">
        Registrarse
      </v-btn>
    </v-col>

    <v-row justify="center">
      <v-col cols="12" class="text-left mt-3">
        <router-link to="/login" class="login-link"> ¿Tienes una cuenta existente? </router-link>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>


export default {
  components: {

  },
  data() {
    return {
      isValid: false,
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
          (value && value.length >= min) ||
          `Debe tener al menos ${min} caracteres`,
      },
    };
  },
  methods: {
    submitFormLogin() {
      if (this.$refs.form.validate()) {
        this.$emit('registerUser', {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        });
       navigateToLogin();
      }
    },
    navigateToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.login-link {
  color: #1976d2;
  text-decoration: none;
  font-weight: bold;
}

</style>
