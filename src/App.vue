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
@import url('http://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800,900&subset=latin,latin-ext');

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
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
