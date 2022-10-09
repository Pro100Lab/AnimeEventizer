<template>
    <v-sheet class="overflow-y-auto d-flex flex-column justify-center">
        <v-form class="mx-4">
            <h2 class="text-center">Создание event</h2>
            <v-card-title >
                Название
            </v-card-title>
            <v-text-field v-model="title">

            </v-text-field>
            <v-card-title>
                Картиночка
            </v-card-title>
          <v-text-field v-model="image">

          </v-text-field>
          <v-card-title>
            Описание
          </v-card-title>
          <v-text-field v-model="description">

          </v-text-field>

          <v-card-title>
            Призовой фонд
          </v-card-title>
          <v-text-field v-model="prize">

          </v-text-field>

          <v-card-title>
            slug
          </v-card-title>
          <v-text-field v-model="slug">

          </v-text-field>
        </v-form>
        <v-btn block v-on:click="createEvent" v-if="isAuthorized">
            Создать!
        </v-btn>
      <v-btn block v-on:click="eventBus.$emit('authorization-start')" v-else>
        Авторизоваться прежде чем добавить событие!
      </v-btn>
    </v-sheet>
</template>

<script>
import axios from 'axios';
import {makeURL} from "../../settings";
import {eventBus} from "../../main";
    export default {
        name: "EventConstructor",
        props: ['authorized'],
      data: () => {
          return {
            title: '',
            description: '',
            image: '',
            slug: '',
            prize: '',
            likes: [],
            participants: [],
            eventBus,
            isAuthorized: false,
          }
      },
      created() {
          this.isAuthorized = this.authorized;
          eventBus.$on('authorized-changed', authorized => {
            this.isAuthorized = authorized;
          })
      },
      methods: {
        createEvent() {
          axios.post(makeURL('event/'), {
            title: this.title,
            description: this.description,
            image: this.image,
            slug: this.slug,
            prize: this.prize
          }).then(()=> {
            eventBus.$emit('event-created');
          })
        }
      }
    }
</script>

<style scoped>

</style>
