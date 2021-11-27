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
        v-if="credentials"
      >
        <span class="mr-2">My emails</span>
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn
        to="/compose"
        text
        v-if="credentials"
      >
        <span class="mr-2">New email</span>
        <v-icon>mdi-lead-pencil</v-icon>
      </v-btn>
      <v-btn
        @click="reset"
        text
        v-if="credentials"
      >
        <span class="mr-2">Exit</span>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-alert
        v-if="error"
        type="error"
      >{{error}}</v-alert>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState(['error', 'credentials']),
  data: () => ({
    //
  }),
  methods: {
    reset() {
      this.$router.push({ name: 'Credentials' });
      this.$store.dispatch('removeCredentials');
    }
  }
};
</script>
