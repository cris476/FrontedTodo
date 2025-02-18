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
          <v-progress-circular v-if="isloading" indeterminate color="white"></v-progress-circular>
          <v-container v-else>
            <div>
              Registrarse
            </div>
          </v-container>
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
  // Recibe `isloading` como prop desde el componente padre
  props: {
    isloading: {
      type: Boolean, // Define el tipo de la prop como booleano
      default: false, // Valor por defecto en caso de que el padre no lo pase
    },
  },
  data() {
    return {
      isValid: true, // Estado que controla si el formulario es válido
      localIsloading: this.isloading, // Variable local para manejar el estado de carga
      // Datos del usuario a registrar
      user: {
        name: '',
        email: '',
        password: '',
      },
      // Reglas de validación para los campos del formulario
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
  watch: {
    // Observa cambios en `isloading` y actualiza la variable local `localIsloading`
    isLoading(newValue) {
      this.localIsloading = newValue;
    }
  },
  methods: {
     /**
     * Valida el formulario y emite un evento con los datos del usuario.
     * Activa el estado de carga mientras se procesa el registro.
     */
    submitFormRegister() {
      if (this.$refs.form.validate()) {
        this.localIsloading = true;
        this.$emit('registerUser', {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        });
      }
    },
  },
};
</script>

<style>
.login-link {
  color: #1976d2;
  text-decoration: none;
  font-weight: bold;
}
</style>
