<script>
import Logo from './logo.vue'
import Index from './index.vue'

export default {
  name: 'app',
  components: {
    Logo,
    Index
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

    <index></index>

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
