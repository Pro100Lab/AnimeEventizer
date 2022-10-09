<template>
<v-card>
  <v-card-title>
  Мои фонды
  </v-card-title>
  <v-divider></v-divider>

  <div class="mx-4 d-flex flex-column align-start justify-start">
    <v-sheet v-for="fund of fundsList" :key="fund.id" class="d-flex flex-column justify-space-between">
      <h3>Фонд <h2>{{fund.name}}</h2></h3>
      <h3>Абстрактных денег <h2>{{fund.amount}}</h2></h3>
      <v-btn block>
        Распределить фонд
      </v-btn>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</v-card>
</template>

<script>
export default {
  name: "MyFunds",
  data: () => {
    return {
      fundsList: [{
        id: 0,
        name: 'Им. Святого Петра',
        amount: 288000
      }, {
        id: 1,
        name: 'руководителя отдела больших транзацкий',
        amount: 30004930201
      }]
    }
  }
}
</script>

<style scoped>

</style>