<template>
    <v-form class="mx-4">
        <v-card-title>
            Логин
        </v-card-title>
        <v-text-field v-model="login">

        </v-text-field>
        <v-card-title>
            Пароль
        </v-card-title>
        <v-text-field v-model="password">

        </v-text-field>
        <v-btn dark block class="rounded-0" v-on:click="tryAuthorize">
            Подтверждаю
        </v-btn>
      <v-card-actions>
        <v-card-subtitle v-if="errorMessage && errorMessage.length > 0" style="color: darkred">
          {{errorMessage}}
        </v-card-subtitle>
      </v-card-actions>
    </v-form>
</template>

<script>
import axios from 'axios';
import {makeURL} from "../../settings";
import {eventBus} from "../../main";

    export default {
        name: "Login",
      data: () => {
          return {
            login: '',
            password: '',
            errorMessage: ''
          }
      },
      methods: {
          tryAuthorize() {
            axios.post(makeURL('login'), {
              username: this.login,
              password: this.password
            }).then(response => {
              eventBus.$emit('authorized', response.data.user)
            }).catch(error => {
              this.errorMessage = error;
            })
          }
      }
    }
</script>

<style scoped>

</style>
