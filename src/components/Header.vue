<template>
  <header>
    <div v-if="loadingState">
      loading...
      <img src="../assets/loading.gif" alt="">
    </div>
    <div v-else class="menu">
      <!-- <a href="/">Home</a> -->
      <h1 class="div2">BLOG</h1>
      <div v-if="isLogged" class="menu__items">
        <router-link to="/">Home</router-link>
        <router-link to="/post-add">Add Post</router-link>
        <div class="">
          <router-link to="/profile">Profile &#10513; {{loggedUser.name}}</router-link>
          |
          <a @click="logout(loggedUser)" href="#">Log Out</a>
        </div>
      </div>
      <div v-else class="menu__items">
        <router-link to="/">Home</router-link>
        
        <!-- <router-link class="fromLeft" :to="{ path: 'login', query: { type: 'login' }}">Log In</router-link> -->
        <router-link class="fromLeft" to="/login">Log In</router-link>
        <router-link class="fromLeft" to="/login">Sign Up</router-link>
<!--         |
        <router-link class="fromLeft" :to="{ path: 'login', query: { type: 'signup' }}">Sign Up</router-link> -->
      </div>
      <hr class="div1">
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  //import router from '../router';
  
  export default {
    name: 'Header',
    data() {
      return {
        //loading: true,
        //user: {},
      }
    },
    computed: {
      ...mapGetters([ 'loggedUser', 
                      'loadingState', 
                      'isLogged', 
                      'allPosts']),
    },
    methods: {
      ...mapActions([ 'fetchUser', 
                      'loadPosts', 
                      'initialState', 
                      'logout' ]),
/*       inputType(type) {
        type == 'signup' ? router.push('/signup') : router.push('/login') ;
      } */
    },
    created() {
      this.initialState();
      //this.loadUser();
    }

  }
</script>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000000000000;
  }

  hr {
    margin: .4em;
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  }

  .title__line {
    margin: .1em;
    border: 0;
    height: 3px;
    background-image: linear-gradient(to right,  rgba(17, 124, 23, 0.75), rgba(0, 0, 0, 0));
  }

  .menu {
    padding: .5em;
    background-image: linear-gradient(to top, white,  #c2f0bc 80%);
    font-size: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
  }

  .div1 { grid-area: 2 / 1 / 3 / 3; } 

  .div2 { 
    grid-area: 1 / 1 / 2 / 2;
    margin: 0; 
  }

  .menu__items {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    grid-area: 1 / 2 / 2 / 3;
  }

  header a {
    text-decoration: none;
    margin: 5px;
    font-weight: bold;
    color: rgb(3, 168, 105);
    display:inline-block; 
    text-transform:uppercase;  
  }

  header a:hover {
    color:rgb(1, 85, 53); 
    text-shadow: 2px 2px 2px #3bd826;
  }

  header a:after {
    display: block;
    content: '';
    color: rgb(1, 85, 53);
    border-bottom: solid 3px rgb(1, 85, 53);  
    transform: scaleX(0);  
    transition: transform 750ms ease-in-out;
  }

  header a:hover:after { transform: scaleX(1); } 

  header a.fromLeft:after { transform-origin: 100% 50%; }

  header a.fromLeft:hover:after { transform: scaleX(1); transform-origin: 0% 50%; }

  .post a {
    text-decoration: none;
    margin: 5px;
    font-size: 14px;
    font-weight: bold;
    color: rgb(3, 168, 105);
    display:inline-block; 
    /* text-transform:uppercase;  */
  }

  .post a:after {
    display: block;
    content: '';
    color: rgb(1, 85, 53);
    border-bottom: solid 3px rgb(1, 85, 53);  
    transform: scaleX(0);  
    transition: transform 750ms ease-in-out;
  }

  .post a:hover {
    color:rgb(1, 85, 53); 
    text-shadow: 2px 2px 2px #3bd826;
  }

  .post a:hover:after { transform: scaleX(1); } 
</style>