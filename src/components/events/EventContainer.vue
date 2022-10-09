<template>
    <v-sheet class="transparent mx-4 my-4">
        <v-row>
            <v-col cols="4" v-for="card of cards" :key="card.id">
                <event-card :card="card" :authorized="isAuthorized" class="fill-height" v-if="card.id !== -1"></event-card>
                <event-creator :authorized="isAuthorized" v-if="!preset && card.id === -1" class="fill-height"></event-creator>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
    import EventCard from "./EventCard";
    import EventCreator from "./EventCreator";
    import axios from 'axios';
    import {makeURL} from "../../settings";
    import {eventBus} from "../../main";
    export default {
        name: "CardContainer",
        components: {EventCreator, EventCard},
        data: () => {
            return {
              cards: [],
              preset: null,
              isAuthorized: false
                }
            },
      created() {
          this.loadCards();
          eventBus.$on('event-created', () => {
            this.loadCards();
          })
          eventBus.$on('preset-changed', preset => {
            this.preset = preset;
            this.loadCards();
          })
        eventBus.$on('authorized-changed', authorized => {
          this.isAuthorized = authorized;
        })
      },
      methods: {
          loadCards() {
            let presetRequest = '';
            if (this.preset) {
              presetRequest += `preset=${this.preset}/`
            }
            axios.get(makeURL(`event/${presetRequest}`)).then(response => {
              if(presetRequest.length) {
                const cards = response.data;
                let events = [];
                cards.forEach(card => {
                  axios.get(makeURL(`event/?id=${card.pk}`)).then(response => {
                    events.push(response.data.results[0]);
                  })
                })
                this.cards = events;
              } else {
                this.updateCards(response.data.results);
              }
            })
          },
          updateCards(cards) {
            this.cards = cards;
            this.cards.push(this.creationCard());
          },
        creationCard() {
            return {
              id: -1
            }
        }
      }
    }
</script>

<style scoped>
    .scalable {
        transform: scale(1);
        transition-duration: 0.5s;
    }
    .scalable:hover {
        transform: scale(1.1);
        transition-duration: 0.5s;
    }
</style>
