<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn
        to="/"
        text
      >
        <span class="mr-2">My emails</span>
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn
        to="/compose"
        text
      >
        <span class="mr-2">New email</span>
        <v-icon>mdi-lead-pencil</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
