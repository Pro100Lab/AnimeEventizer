<template>
    <v-sheet class="d-flex flex-column">
        <h2 class="text-center">Награды</h2>
        <award v-for="award of awards" :key="award.id" :award="award"></award>
    </v-sheet>
</template>

<script>
    import Award from "./Award";
    export default {
        name: "AwardHistory",
        components: {Award},
        data: () => {
            return {
                awards: [
                    {
                        id: 0,
                        title: 'Спасибо',
                        author: 'dich',
                        text: 'За помощь в программировании!',
                        icon: 'mdi-circle-multiple-outline',
                    },
                  {
                    id: 1,
                    title: '#1 место',
                    author: 'Фонд им. Святого Петра',
                    text: 'Победа в кокнурсе "Литрбол"',
                    icon: 'mdi-circle-multiple-outline'
                  }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
