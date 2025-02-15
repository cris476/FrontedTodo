<template>
  <v-app>

    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="text">To Do</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
