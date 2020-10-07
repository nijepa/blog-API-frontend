<template>
  <div id="app">
    <div id="nav">
      <Header />
   <!--    <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/login">Log In</router-link> -->
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
#app {
  font-family: 'Chewy', cursive;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
/*   background-size: 340px, auto;
  background-image: url("./assets/4048976.svg"),
                    linear-gradient(210deg, rgb(228, 181, 28), #1247f7);
                    background-attachment: fixed; */
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    // color: #2c3e50;

    &.router-link-exact-active {
      color: #e6d32d;
    }
  }
}

</style>
