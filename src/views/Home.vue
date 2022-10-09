<template>
  <div>
    <filters class="ml-10 my-4"></filters>
    <card-container class="home-page__main px-8"></card-container>
    <super-menu class="menu__main"></super-menu>

  </div>
</template>

<script>
// @ is an alias to /src

import CardContainer from "../components/events/EventContainer";
import Menu from "../components/menu/Menu";
import Filters from "../components/filter/Filters";
export default {
  name: 'Home',
  components: {
    Filters,
    'super-menu': Menu,
    CardContainer
  }

}
</script>

<style scoped>

  .home-page__main {
    position: absolute;
    left: 0;
    width: 80%;
  }

  .menu__main {
    position: fixed;
    right: 0;
    top: 8.5%;
    width: 19%;
    height: 100%;
  }
</style>
