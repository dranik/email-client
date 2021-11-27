<template>
  <div class="home">
    <v-progress-linear
      v-if="loading"
      indeterminate
    ></v-progress-linear>
    <v-alert
      v-if="success"
      type="success"
    >Message has successfully been sent!</v-alert>
    <v-container v-else>
      <v-row class="compose__input-to">
        <v-col cols="12">
          <v-text-field
            v-model="to"
            :rules="mainEmailRules"
            label="To"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="compose__input-cc">
        <v-col cols="12">
          <v-text-field
            v-model="cc"
            :rules="emailRules"
            label="CC"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="compose__input-bcc">
        <v-col cols="12">
          <v-text-field
            v-model="bcc"
            :rules="emailRules"
            label="BCC"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="compose__input-bcc">
        <v-col cols="12">
          <v-text-field
            v-model="subject"
            :rules="subjectRules"
            label="Subject"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="compose__letter">
        <v-col cols="6">
          <v-textarea
            v-model="text"
            :rules="textRules"
            placeholder="Use markdown to type the text"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <div v-html="compiledMarkdown"></div>
        </v-col>
      </v-row>
      <div class="compose__buttons">
        <v-btn
          @click="sendEmail"
          color="primary"
        >
          <span>Send</span>
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import showdown from 'showdown';

export default {
  name: 'Home',
  data: () => ({
    loading: false,
    success: false,
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    text: "",
    mainEmailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    subjectRules: [
      v => !!v || 'Subject is required'
    ],
    emailRules: [
      v => (v ? /.+@.+/.test(v) : true) || 'E-mail must be valid',
    ],
    textRules: [
      v => !!v || 'Text is required'
    ]
  }),
  computed: {
    compiledMarkdown() {
      const converter = new showdown.Converter();
      return converter.makeHtml(this.text);
    },
    ...mapState(['credentials', 'error'])
  },
  methods: {
    async sendEmail() {
      this.loading = true;
      await this.$store.dispatch('sendEmail', {
        to: this.to,
        cc: this.cc,
        bcc: this.bcc,
        subject: this.subject,
        text: this.compiledMarkdown
      });

      if (!this.error) this.success = true;
      this.loading = false;
    }
  },
  mounted() {
    if (!this.credentials) this.$router.push({ name: 'Credentials' });
  }
}
</script>

<style>
.compose__buttons {
  display: flex;
  justify-content: end;
}
</style>
