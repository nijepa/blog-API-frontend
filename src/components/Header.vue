<template>
  <header>
    <div v-if="loadingState">
      loading...
      <img src="../assets/loading.gif" alt="">
    </div>
    <div v-else class="menu">
      <!-- <a href="/">Home</a> -->
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
  .menu {
    border: 2px solid rgb(7, 72, 110);
    background-color: rgb(69, 173, 221);
    padding: 10px;
    border-radius: 5px;
  }
  .menu__items {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
  }
  router-link, a {
    text-decoration: none;
    margin: 5px;
    font-size: 20px;
    font-weight: bold;
    color: darkslategrey;
    display:inline-block; 
    /* text-transform:uppercase;  */
  }
  router-link:hover, a:hover {
    color: indigo; 
    
    /* text-decoration: underline; */
    
  }
  router-link:after, a:after {
    display: block;
    content: '';
    color: indigo;
    border-bottom: solid 3px indigo;  
    transform: scaleX(0);  
    transition: transform 750ms ease-in-out;
  }
  router-link:hover:after, a:hover:after { transform: scaleX(1); } 

  router-link.fromLeft:after { transform-origin: 100% 50%; }
  router-link.fromLeft:hover:after { transform: scaleX(1); transform-origin: 0% 50%; }
</style>