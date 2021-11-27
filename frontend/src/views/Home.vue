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
  computed: mapState(['loadingEmails', 'emails', 'credentials']),
  methods: {
    handleRowClick({uid}) {
      this.$router.push({ name: 'Show', params: { uid } });
    }
  },
  mounted() {
    if (!this.credentials) this.$router.push({ name: 'Credentials' });
  }
}
</script>
