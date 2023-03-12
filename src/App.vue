<template> 
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Domine', serif;
}

body {
  margin: 0;
  background:rgb(255, 255, 255);
}
main {
  display: flex;
  justify-content:center;
}
</style>
