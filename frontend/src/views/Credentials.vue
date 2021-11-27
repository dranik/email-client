<template>
  <div >
    <v-container class="credentials__container">
      <v-row class="credentials__input-to">
        <v-col cols="8">
          <v-text-field
            v-model="imap_host"
            :rules="required"
            label="IMAP host"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="imap_port"
            :rules="number"
            label="IMAP port"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="credentials__input-to">
        <v-col cols="8">
          <v-text-field
            v-model="smtp_host"
            :rules="required"
            label="SMTP host"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="smtp_port"
            :rules="number"
            label="SMTP port"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="credentials__input-to">
        <v-col cols="6">
          <v-text-field
            v-model="username"
            :rules="required"
            label="Username"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="domain"
            :rules="required"
            label="Domain"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="credentials__input-to">
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :rules="required"
            label="Password"
            type='password'
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="credentials__input-to">
        <v-col cols="12">
          <v-text-field
            v-model="from_email"
            :rules="email"
            label="From email address"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="credentials__buttons">
        <v-btn
          @click="createCredentials"
          color="primary"
        >
          <span>Start session</span>
        </v-btn>
      </div>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    imap_host: "imap.googlemail.com",
    imap_port: "993",
    smtp_host: "smtp.gmail.com",
    smtp_port: "587",
    username: "",
    domain: "gmail.com",
    password: "",
    from_email: "",
    email: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    required: [
      v => !!v || 'Required'
    ],
    number: [
      v => !!v || 'Required',
      v => /^\d$/.test(v) || 'Number must be valid'
    ]
  }),
  computed: mapState(['credentials']),
  methods: {
    async createCredentials() {
      await this.$store.dispatch('createCredentials', {
        imap_host: this.imap_host,
        imap_port: this.imap_port,
        smtp_host: this.smtp_host,
        smtp_port: this.smtp_port,
        username: this.username,
        domain: this.domain,
        password: this.password,
        from_email: this.from_email
      });

      if (this.credentials) {
        this.$store.dispatch('getEmails');
        this.$router.push({ name: 'Home' });
      }
    }
  }
}
</script>

<style>
.credentials__container {
  max-width: 400px;
}
</style>
