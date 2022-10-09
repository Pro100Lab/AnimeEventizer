<template>
    <v-card
        class="rounded-5 d-flex flex-column fill-height"
    >
      <div class="image-container__event">
        <v-img
            :src="eventInfo.image && eventInfo.image.includes('http')? eventInfo.image : 'https://www.paliha14.ru/assets/components/gallery/images/news/feer_predlog_3.jpg'"
            height="300"
            max-height="300"
            contain
            class="scalable"
        >
        </v-img>
      </div>
      <v-card-title>
        {{eventInfo.title}}
      </v-card-title>

      <v-card-subtitle style="text-overflow: ellipsis">
        {{eventInfo.description && eventInfo.description.length > 150 ? eventInfo.description.slice(0, 150) + '...' : eventInfo.description}}
      </v-card-subtitle>

      <v-spacer></v-spacer>
      <v-card-actions class="mx-8">
        <v-icon color="red">mdi-calendar-star</v-icon>
        {{eventInfo.datetime}}
        <v-spacer></v-spacer>
        {{eventInfo.comment ? eventInfo.comment.length : Math.round(Math.random() * 200)}}
        <v-icon color="red">mdi-comment-text-multiple-outline</v-icon>
      </v-card-actions>

      <v-card-actions class="mx-8">
        <v-icon color="red">mdi-account-group-outline</v-icon>
        {{eventInfo.participants ? eventInfo.participants.length : Math.round(Math.random() * 200)}}
        <v-spacer></v-spacer>
        {{eventInfo.prize ? eventInfo.prize : Math.round(Math.random() * 200)}}<v-icon color="red">mdi-cash-multiple</v-icon>
      </v-card-actions>

      <v-btn v-if="isAuthorized" block max-height="50" height="50" v-on:click.stop.prevent="!eventFitted ? fitIn(card) : fitOut(card)">
        {{ this.eventFitted ? 'Выписаться' : 'Вписаться' }}
      </v-btn>
      <v-btn v-else block max-height="50" height="50" v-on:click.stop.prevent="eventBus.$emit('authorization-start')">
        Авторизуйтесь для участия
      </v-btn>
    </v-card>
</template>

<script>
import axios from 'axios';
import {makeURL} from "../../settings";
import {eventBus} from "../../main";

export default {
  name: "EventView",
  props: ['id', 'authorized'],
  data: () => {
    return {
      eventInfo: {},
      eventBus,
      isAuthorized: false,
    }
  },
  created() {
    this.isAuthorized = this.authorized;
    eventBus.$on('authorized-changed', authorized => {
      this.isAuthorized = authorized;
    })
    axios.get(makeURL(`event/?id=${this.id}`)).then(response => {
      this.eventInfo = response.data.results[0];
    })
  }
}
</script>

<style scoped>

</style>