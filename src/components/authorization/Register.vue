<template>
    <v-form class="mx-4">
      <v-card-title >
        Email
      </v-card-title>
      <v-text-field v-model="email">

      </v-text-field>
        <v-card-title >
            Логин
        </v-card-title>
        <v-text-field v-model="login">

        </v-text-field>
        <v-card-title>
            Пароль
        </v-card-title>
        <v-text-field v-model="password">

        </v-text-field>
        <v-btn dark block class="rounded-0" v-on:click="tryRegister">
            Зарегаться
        </v-btn>
    </v-form>
</template>

<script>
    import axios from "axios";
    import {makeURL} from "../../settings";
    import {eventBus} from "../../main";

    export default {
        name: "Register",
      data: () => {
          return {
            login: '',
            email: '',
            password: ''
          }
      },
      methods: {
          tryRegister() {
            axios.post(makeURL('register'), {
              username: this.login,
              email: this.email,
              password: this.password
            }).then(response => {
              eventBus.$emit('registered', response.data.user)
            }).catch(error => {
              this.errorMessage = error;
            })
          }
      }
    }
</script>

<style scoped>

</style>
