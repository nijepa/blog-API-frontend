<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view/>
    <Footer />
  </div>
</template>
<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  export default {

    name: 'App',

    components: {
      Header, Footer
    }
  }
</script>

<style lang="scss">
:root {
  --clr-border: #333;
}
  #app {
    font-family: 'Chewy', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      // color: #2c3e50;

      &.router-link-exact-active {
        color: rgb(1, 85, 53);
        text-shadow: 2px 2px 2px #3bd826;
      }
    }
  }

</style>
