<template>
    <v-card class="elevation-0 d-flex flex-column">
      <v-card-title>
          {{award.title}}
        <v-icon class="mx-1">{{award.icon}}</v-icon>
      </v-card-title>
      <v-card-subtitle>
        {{award.text}}
      </v-card-subtitle>
      <v-card-text>от: {{award.author}}</v-card-text>

    </v-card>
</template>

<script>
    export default {
        name: "Award",
        props: ['award']
    }
</script>

<style scoped>

</style>
