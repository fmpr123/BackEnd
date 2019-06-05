<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="400"
        ></v-img>
      </v-flex>
      
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Realistic
        </h1>
      </v-flex>
      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Log In</h2>
        <v-layout justify-center>

          <v-flex xs12 sm6 md3>
          <v-text-field name="email"
            label="Email"
            box
          ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout justify-center>
        <v-flex xs12 sm6 md3 style="height: 80px">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
        </v-layout>
        
        <v-btn type="submit" color="#7FDBFF">Enter</v-btn>
        <v-btn color="#39CCCC">Register</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show1: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The username and password you entered don\'t match')
        }
      }
    }
  }
</script>

<style>

</style>
