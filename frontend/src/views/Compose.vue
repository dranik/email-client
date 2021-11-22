<template>
  <div class="home">
    <v-container>
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
      <v-row class="compose__letter">
        <v-col cols="6">
          <v-textarea
            v-model="text"
            :rules="emailRules"
            label="Use markdown to type the text"
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
import showdown from 'showdown';

export default {
  name: 'Home',
  data: () => ({
    to: "",
    cc: "",
    bcc: "",
    text: "",
    mainEmailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    emailRules: [
      v => (v ? /.+@.+/.test(v) : true) || 'E-mail must be valid',
    ]
  }),
  computed: {
    compiledMarkdown() {
      const converter = new showdown.Converter();
      return converter.makeHtml(this.text);
    }
  },
  methods: {
    sendEmail() {

    }
  }
}
</script>

<style>
.compose__buttons {
  display: flex;
  justify-content: end;
}
</style>
