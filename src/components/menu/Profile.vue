<template>
    <v-card style="width: 100%;" class="elevation-0">

        <div class="d-flex flex-column justify-center align-center mx-4 py-0 my-0">
        <v-avatar size="100">
            <v-img src="https://www.sostav.ru/app/public/images/news/2014/02/18/sasha_grey_wallpaper_10-other.jpg?rand=0.3434210647828877">

            </v-img>
        </v-avatar>
        <v-card-title class="text-break mr-1 pb-0">
          {{ name }}
          <p class="text-break" style="color: lightblue">{{email}}</p>
        </v-card-title>
        </div>

      <div class="d-flex flex-column justify-start align-start mx-4 my-0">

          <v-card-subtitle class="text-break mr-1" style="color: burlywood">
          Статус: {{ status }}
        </v-card-subtitle>
          </div>

    </v-card>
</template>

<script>
    import {eventBus} from "../../main";

    export default {
        name: "ProfileComponent",
      data: () => {
        return {
          name: '',
          email: '',
          status: 'чепушило'
        }
      },
        created() {
          eventBus.$on('authorized-changed', (value, profile) => {
          if(value && profile) {
            this.name = profile.username;
            this.email = profile.email;
            if(profile.is_superuser)
              this.status = 'Супер Админ'
          }
        })
      }
    }
</script>

<style scoped>

</style>
