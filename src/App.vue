<template>
  <v-app>
    <toolbar class="toolbar__main" style="height: 8.5%"></toolbar>
    <anime-background></anime-background>
    <v-main>
      <router-view/>
    </v-main>

    <v-dialog v-model="isAuthorization">
      <authorization class="authorization-toolbar__global"></authorization>
    </v-dialog>

    <v-dialog v-model="isEventCreating">
      <event-constructor :authorized="isAuthorized" class="event-creation-toolbar__global"></event-constructor>
    </v-dialog>

    <v-dialog v-model="isEventViewActivated">
      <event-view class="event-creation-toolbar__global" :id="this.eventId" :authorized="isAuthorized"></event-view>
    </v-dialog>

    <v-dialog v-model="isMyFoundsActivated">
      <my-funds class="event-creation-toolbar__global"></my-funds>
    </v-dialog>

    <v-dialog v-model="isSettingsActivated">
      <fund-settings class="event-creation-toolbar__global"></fund-settings>
    </v-dialog>
  </v-app>
</template>

<script>

import Toolbar from "./components/Toolbar";
import AnimeBackground from "./components/AnimeBackground";
import {eventBus} from "./main";
import Authorization from "./components/authorization/Authorization";
import EventConstructor from "./components/events/EventConstructor";
import EventView from "./components/events/EventView";
import axios from 'axios';
import {makeURL} from "./settings";
import MyFunds from "./components/funds/MyFunds";
import FundSettings from "./components/funds/FundSettings";

export default {
  name: 'App',
  components: {FundSettings, MyFunds, EventView, EventConstructor, Authorization, AnimeBackground, Toolbar},
  data: () => {
    return {
      isAuthorized: false,
      isAuthorization: false,
      isEventCreating: false,
      profileInfo: null,
      isEventViewActivated: false,
      isMyFoundsActivated: false,
      isSettingsActivated: false,
      eventId: null
    }
  },
  created() {
    eventBus.$on('authorized', (profile) => {
      this.profileInfo = profile;
      this.setAuthorized(true);
    })
    eventBus.$on('registered', (profile) => {
      this.profileInfo = profile;
      this.setAuthorized(true);
    })
    eventBus.$on('log-out', () => {
      this.setAuthorized(false);
    })
    eventBus.$on('authorization-start', () => {
      this.isAuthorization = true;
    })
    eventBus.$on('event-create-start', () => {
      this.isEventCreating = true;
    })
    eventBus.$on('event-created', () => {
      this.isEventCreating = false;
    })
    eventBus.$on('settings-check-start', () => {
      this.isSettingsActivated = true;
    })
    eventBus.$on('found-check-start', () => {
      this.isMyFoundsActivated = true;
    })
    eventBus.$on('event-view-activated', id => {
      this.eventId = id;
      this.isEventViewActivated = true;
    });
    eventBus.$on('fit-in', event => {
      if(!this.profileInfo)
        return;
      axios.post(makeURL(`event/${event.slug}/add/${this.profileInfo.id}/`)).then(() => {
        eventBus.$emit('event-fitted-in', event, this.profileInfo);
      })
    })
  },
  methods: {
    setAuthorized(authorized) {
      this.isAuthorized = authorized;
      this.isAuthorization = false;
      if(!this.isAuthorized)
        this.profileInfo = null;
      eventBus.$emit('authorized-changed', this.isAuthorized, this.profileInfo);
    }
  }

};
</script>
<style>

</style>
