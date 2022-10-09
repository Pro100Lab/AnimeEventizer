<template>
    <v-card
        class="rounded-5 d-flex flex-column fill-height"
        v-on:click="eventBus.$emit('event-view-activated', card.id)"
    >
        <div class="image-container__event">
            <v-img
                    :src="card.image && card.image.includes('http')? card.image : 'https://www.paliha14.ru/assets/components/gallery/images/news/feer_predlog_3.jpg'"
                    height="150"
                    max-height="150"
                    class="scalable"
            >
            </v-img>
        </div>
        <v-card-title>
            {{card.title}}
        </v-card-title>

        <v-card-subtitle style="text-overflow: ellipsis">
            {{card.description && card.description.length > 150 ? card.description.slice(0, 150) + '...' : card.description}}
        </v-card-subtitle>

        <v-spacer></v-spacer>
        <v-card-actions class="mx-8">
            <v-icon color="red">mdi-calendar-star</v-icon>
            {{card.datetime}}
            <v-spacer></v-spacer>
            {{card.comment ? card.comment.length : Math.round(Math.random() * 200)}}
            <v-icon color="red">mdi-comment-text-multiple-outline</v-icon>
        </v-card-actions>

        <v-card-actions class="mx-8">
            <v-icon color="red">mdi-account-group-outline</v-icon>
            {{card.participants ? card.participants.length : Math.round(Math.random() * 200)}}
            <v-spacer></v-spacer>
            {{card.prize ? card.prize : Math.round(Math.random() * 200)}}<v-icon color="red">mdi-cash-multiple</v-icon>
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
    import {eventBus} from "../../main";

    export default {
        name: "EventCard",
        props: ['card', 'authorized'],
        data: () => {
          return {
            eventBus,
            eventFitted: false,
            isAuthorized: false,
          }
    },
      created() {
          this.isAuthorized = this.authorized;
        eventBus.$on('event-fitted-in', (event, profile) => {
          if(this.card.id === event.id)
            this.eventFitted = true;
          console.log(`profile ${JSON.stringify(profile)} fitted in event ${JSON.stringify(event)}`);
        });
        eventBus.$on('authorized-changed', authorized => {
          this.isAuthorized = authorized });
      },
      methods: {
          fitIn(event) {
            eventBus.$emit('fit-in', event);
          },
        fitOut(event) {
            eventBus.$emit('fit-out', event);
        }
        }
    }
</script>

<style scoped>
    .scalable {
        transition-duration: 0.5s;
        overflow: hidden;
        object-fit: contain;
    }

    .scalable:hover {
        transform: scale(1.1);
        transition-duration: 0.5s;
    }

    .image-container__event {
        max-height: 150px;
        overflow: hidden;
    }
</style>
