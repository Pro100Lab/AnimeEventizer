<template>
    <v-sheet class="transparent d-flex flex-row">
        <v-btn
            color="transparent"
            class="elevation-0"
            v-for="filter of filters"
            :key="filter.id"
            v-on:click="eventBus.$emit('preset-changed', filter.url)"
        >
            <v-icon color="yellow" v-if="filter.id === 0" class="mx-1">mdi-crown</v-icon>{{filter.name}}
        </v-btn>
    </v-sheet>
</template>

<script>
    import {eventBus} from "../../main";

    export default {
        name: "Filters",
        data: () => {
            return {
              eventBus,
                filters: [{
                    id: 0,
                    name: 'Топ-3',
                    url: 'top'
                }, {
                    id: 2,
                    name: 'Популярные',
                    url: 'popular'
                }, {
                    id: 3,
                    name: 'Ближайшие',
                    url: 'nearest'
                }, {
                    id: 4,
                    name: 'Большой фонд',
                    url: 'richest'
                }, {
                  id: 6,
                  name: 'Все',
                  url: null
                }]
            }
        }
    }
</script>

<style scoped>

</style>
