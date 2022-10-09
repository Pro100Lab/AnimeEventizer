<template>
    <v-sheet class="d-flex flex-column py-5 overflow-auto">
      <div>
        <profile-component :class="isAuthorized ? '' : 'backdrop'"></profile-component>
        <v-divider></v-divider>
        <award-history :class="isAuthorized ? '' : 'backdrop'"></award-history>
        <v-divider></v-divider>
        <my-events :class="isAuthorized ? '' : 'backdrop'"></my-events>
        <v-divider></v-divider>
        <last-created-events :class="isAuthorized ? '' : 'backdrop'"></last-created-events>
      </div>
      <div v-if="!isAuthorized" class="d-flex flex-column align-center fixed__menu justify-center">
        <v-img src="../../assets/component/pngegg.png" max-height="100" width="100"  contain> </v-img>
        <h2 class="text-break text-center pa-5">
          Необходимо авторизоваться
        </h2>
      </div>
    </v-sheet>
</template>

<script>
    import ProfileComponent from "./Profile";
    import AwardHistory from "./AwardHistory";
    import MyEvents from "./MyEvents";
    import LastCreatedEvents from "./LastCreatedEvents";
    import {eventBus} from "../../main";
    export default {
        name: "Menu",
        components: {LastCreatedEvents, MyEvents, AwardHistory, ProfileComponent},
    data: () => {
          return {
            isAuthorized: false
          }
    },
      created() {
          eventBus.$on('authorized-changed', (value) => {
            this.isAuthorized = value;
          })
      }
    }
</script>

<style scoped>

.backdrop {
  filter: blur(10px);
}
.fixed__menu {
 position: absolute;
  height: 100%;
  width: 100%;
}
</style>
