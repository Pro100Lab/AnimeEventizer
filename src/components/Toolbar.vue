<template>
    <v-app-bar
            app
            style="background-color: rgba(0,0,0, 0.5)"
            dark
    >
        <div class="image-relative ml-8">
        <v-img
                src="../assets/justText.png"
                class="ma-0 pa-0 image-relative__item-top"
                height="80"
                style="cursor: pointer"
                v-on:click="rotateZ"
                contain>
        </v-img>
        <v-img
                src="../assets/justZ.png"
                class="ma-0 pa-0 image-relative__item-bottom"
                height="80"
                contain
                id="rotatable"
                style="cursor: pointer"
                v-on:click="rotateZ"
        >
        </v-img>
        </div>
        <v-spacer></v-spacer>


      <v-btn class="mr-2 transparent block elevation-0" v-on:click="eventBus.$emit('settings-check-start')" v-if="isAuthorized">
        Настройка <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-btn class="mr-2 transparent block elevation-0" v-on:click="eventBus.$emit('found-check-start')" v-if="isAuthorized">
        Фонды
      </v-btn>

        <v-btn class="transparent block elevation-0" v-on:click="eventBus.$emit('event-create-start')" v-if="isAuthorized">
            Создать Event
        </v-btn>

        <v-btn class="mr-2 transparent block elevation-0" v-on:click="eventBus.$emit('authorization-start')" v-if="!isAuthorized">
            Авторизация
        </v-btn>
        <v-btn class="mr-2 transparent block elevation-0" v-on:click="eventBus.$emit('log-out')" v-if="isAuthorized" >
            Дропнуть
        </v-btn>


    </v-app-bar>
</template>

<script>
    import {eventBus} from "../main";

    export default {
        name: "Toolbar",
        data: () => {
            return {
                isAuthorized: false,
                zRotate: 0,
                zRotatedAmount: 0,
                eventBus
            }
        },
        created() {
          eventBus.$on('authorized-changed', value => {
            this.isAuthorized = value;
          });

        },
        methods: {
            rotateZ() {
                let rotated = document.getElementById('rotatable');

                this.zRotate += 360;
                rotated.style.transform = `rotate(${this.zRotate}deg)`;
                rotated.style.transitionDuration = '0.5s';

                this.zRotatedAmount += 1;
                if(this.zRotatedAmount > 5) {
                    rotated.style.transform = `rotate(${360*50}deg)`;
                    rotated.style.transitionDuration = '2s';

                    this.zRotatedAmount = 0;
                    this.zRotate = 0;
                }
            }
        }
    }
</script>

<style scoped>
    .authorization-toolbar__global {
        position: absolute;
        left: 30%;
        top: 30%;
        width: 40%;
        height: 40%;
    }


    .image-relative{
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        position: relative;
    }

    .image-relative__item-top {
        grid-column: 1;
        grid-row: 1;
        z-index: 1;
    }
    .image-relative__item-bottom {
        grid-column: 1;
        grid-row: 1;
    }
</style>
