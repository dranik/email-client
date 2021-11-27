<template>
  <div class="show__container">
    <div v-if="loadingEmail">
      <v-progress-linear
        indeterminate
      ></v-progress-linear>
    </div>
    <div v-else v-for="part in email" class="show__content" v-html="part" :key="part">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'New',
  computed: mapState(['loadingEmail', 'email', 'credentials']),
  mounted() {
    this.$store.dispatch('getEmail', this.$route.params.uid);
    if (!this.credentials) this.$router.push({ name: 'Credentials' });
  }
}
</script>

<style>
.show__content {
  max-width: 800px;
  margin: auto;
  margin-top: 16px;
}
</style>
