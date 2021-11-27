<template>
  <div class="home__container">
    <div v-if="loadingEmails">
      <v-progress-linear
        indeterminate
      ></v-progress-linear>
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="emails"
        :hide-default-footer="true"
        @click:row="handleRowClick"
      ></v-data-table>
      <div class="home__controls">
        <v-btn
          v-if="page > 1"
          @click="previousPage"
          color="primary"
          text
        >
          <v-icon>mdi-arrow-left</v-icon>
          <span class="mr-2">Previous</span>
        </v-btn>
        <v-btn
          @click="reload"
          color="primary"
          text
        >
          <span class="mr-2">Reload</span>
        </v-btn>
        <v-btn
          @click="nextPage"
          color="primary"
          text
        >
          <span class="mr-2">Next</span>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data () {
    return {
      headers: [
        {
          text: 'From', value: 'from',
        },
        { text: 'Subject', value: 'subject' },
        { text: 'Date', value: 'date' }
      ]
    }
  },
  computed: mapState(['loadingEmails', 'emails', 'credentials', 'page']),
  methods: {
    handleRowClick({uid}) {
      this.$router.push({ name: 'Show', params: { uid } });
    },
    reload() {
      this.$store.dispatch('getEmails');
    },
    previousPage() {
      this.$store.dispatch('previousPage');
      this.$store.dispatch('getEmails');
    },
    nextPage() {
      this.$store.dispatch('nextPage');
      this.$store.dispatch('getEmails');
    }
  },
  mounted() {
    if (!this.credentials) this.$router.push({ name: 'Credentials' });
  }
}
</script>

<style>
.home__controls {
  text-align: center;
}
</style>
