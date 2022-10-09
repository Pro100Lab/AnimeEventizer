<template>
  <v-card>
    <v-card-title>
    Настройка фондов
    </v-card-title>
    <v-card-text>Способ начисления</v-card-text>

    <div class="mx-4">
      <v-radio-group v-model="settingsType">
        <v-radio label="Всем, периодичеки" value="all"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="periodicalType">
        <v-radio label="неделя" value="week"></v-radio>
        <v-radio label="месяц" value="month"></v-radio>
        <v-radio label="квартал" value="quarter"></v-radio>

      </v-radio-group>

    <v-radio-group v-model="settingsType">
    <v-radio label="Конкретному отделу" value="concrete"></v-radio>
    </v-radio-group>
    <v-card-actions>
      <v-combobox label="Выберете сотрудника" :items="namesList">
      </v-combobox>
    </v-card-actions>
    <p class="mx-4 my-0 py-0">Количество денег:</p>
    <v-text-field v-model="moneyAmount"></v-text-field>
    <v-btn block v-on:click="applySettings">
      Подтвердить
    </v-btn>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';
import {makeURL} from "../../settings";
export default {
  name: "FundSettings",
  data: () => {
    return {
      periodicalType: '',
      namesList: [],
      moneyAmount: 0,
      settingsType: ''
    }
  },
  methods: {
    applySettings() {
      axios.post(makeURL('budget/settings_apply'), {

      })
    }
  },
  created() {
    axios.get(makeURL('user_list')).then(response => {
      response.data.results.forEach(result=>{
        this.namesList.push(result.username);
      })
    })
  }
}
</script>

<style scoped>

</style>