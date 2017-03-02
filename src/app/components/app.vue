<script>
import Logo from './logo.vue'

export default {
  name: 'app',
  components: {
    Logo
  }
}
</script>

<template>
  <div id="app">
    <header>
      <div class="overlay"></div>

      <h1>
        <logo></logo>
      </h1>
    </header>

    ...

    <footer>
      <h2 class="logo">
        <logo></logo>
      </h2>

      <p>Copyright © 2015 - {{ new Date().getFullYear() }}</p>
      <p>Proibida a reprodução sem autorização</p>
    </footer>
  </div>
</template>

<style lang="stylus">
@import '../assets/styles/style.styl';
</style>
