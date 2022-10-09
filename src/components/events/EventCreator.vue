<template>
    <v-card dark
            style="opacity: 0.3"
            class="rounded-5 d-flex flex-column justify-center align-center fill-height"
            v-on:click="eventBus.$emit('event-create-start')"
    >
        <v-card-title>Добавить событие</v-card-title>
        <v-img
                class="scalable"
                src="../../assets/component/cross-plus-outline.png"
                contain
                height="200"
        ></v-img>
        <v-dialog v-model="isEventCreating">
            <event-constructor
                class="event-creation-toolbar__global"
                :authorized="authorized">
            </event-constructor>
        </v-dialog>
    </v-card>
</template>

<script>
    import EventConstructor from "./EventConstructor";
    import {eventBus} from "../../main";

    export default {
        name: "EventCreator",
        components: {EventConstructor},
        props: ['authorized'],
        data: () => {
            return {
                isEventCreating: false,
              eventBus
            }
        },
        methods: {

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
.event-creation-toolbar__global{
  position: absolute;
  left: 20%;
  top: 20%;
  width: 60%;
  height: 60%;
}
</style>
