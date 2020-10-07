<template>
  <div class="wrapper">
    <div class="log">
      <!-- <div v-if="type === 'login'" class="log"> -->
        <transition name="slide-fade">
      <form v-if="type === 'login'" @submit.prevent="login(loginInput)" method="post" class="log">
        <!-- <label for="email">E-Mail</label> -->
        <input @focus="clearErrors" v-model="loginInput.email" type="email" name="email" class="cool-link" placeholder="pls enter e-mail" required>
        <!-- <label for="password">Password</label> -->
        <input @focus="clearErrors" v-model="loginInput.password" type="password" name="password" class="cool-link" placeholder="pls enter password" required>
        <button type="submit" class="btn-sub" value="Log In" >Log In</button>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
      <div v-else class="btn-oposite">
        <p>Already sign up ?</p>
        <button @click="changeType('login')" class="btn-sub">Log In</button>
      </div>
        </transition>
    </div>
    <div  class="log">
      <transition name="slide-fade">
      <form v-if="type === 'signup'" @submit.prevent="signup(signupInput)" method="post" class="log" required>
        <!-- <label for="email">E-Mail</label> -->
        <input @focus="clearErrors" v-model="signupInput.email" type="email" name="email" class="cool-link" placeholder="e-mail" required>
        <!-- <label for="password">Password</label> -->
        <input @focus="clearErrors" v-model="signupInput.password" type="password" name="password" class="cool-link" placeholder="password" required>
        <!-- <label for="username">User Name</label> -->
        <input @focus="clearErrors" v-model="signupInput.username" type="text" name="username" class="cool-link" placeholder="user name" required>
        <!-- <label for="first_name">First Name</label> -->
        <input @focus="clearErrors" v-model="signupInput.first_name" type="text" name="first_name" class="cool-link" placeholder="first name" required>
        <!-- <label for="last_name">Last Name</label> -->
        <input @focus="clearErrors" v-model="signupInput.last_name" type="text" name="last_name" class="cool-link" placeholder="last name" required>
        <button type="submit" class="btn-sub">Sign Up</button>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
      <div v-else class="btn-oposite">
        <p>Don't have username ?</p>
        <button @click="changeType('signup')" class="btn-sub">Sign Up</button>
      </div>
      </transition>
    </div>
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignInUp',
  data() {
    return {
      type: '',
      loginInput: {
        email: '',
        password: ''
      },
      signupInput: {
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: ''
      },
      user: {}
    }
  },
  computed: {
    ...mapGetters([ 'getInputType', 
                    'loggedUser', 
                    'getErrors' ]),
  },
  methods: {
    ...mapActions([ 'login', 
                    'signup', 
                    'clearErrors' ]),
    changeType(type) {
      this.type = type;
    },
    setInput() {
      this.clearErrors;
    }
  },
/*   created() {
    if(this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  } */
}
</script>

<style>
  input, button, textarea {
    font-family: 'Chewy', cursive;
  }
  .wrapper {
    display: grid;
    grid-template-columns: auto auto;
  }
  .log {
    display: flex;
    flex-direction: column;
    /* grid-template-columns: auto auto; */
    grid-gap: 10px;
    /* border: 2px solid rgb(31, 150, 197); */
    /* justify-content: center; */
    padding: 10px;
    background: linear-gradient(blue red);
    align-content: center;
    align-items: center;
    align-self: center;
  }
  .cool-link {
    display: inline-block;
    /* color: #000; */
    background-color: transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    text-align: center;
    margin-bottom: 10px;
    border-left: 1px solid #2c3e50;
    border-right: 1px solid #2c3e50;
    border-radius: 5px;
    cursor: pointer;
  }
  .cool-link:hover {
    border: 3px solid indigo;
    transition: border .9s; 
  }
  .cool-link:focus {
    border: 3px solid indigo;
    /* transition: border-bottom .9s;  */
  }
  .btn-sub {
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    font-weight: bolder;
    border-bottom: 5px solid transparent;
    border-left: 2px solid #2c3e50;
    border-right: 2px solid #2c3e50;
    border-top: 5px solid transparent;
    border-radius: 50%;
    background: transparent;
    justify-self: center;
    padding: 5px;
    cursor: pointer;
  }
  .btn-sub:hover {
    border-bottom: 5px solid indigo;
    border-top: 5px solid indigo;
    color: indigo;
    transition: border .9s;
  }
  .err {
    color: crimson;
  }

  /* Enter and leave animations can use different */
/* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
/*  .slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}  */
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
</style>