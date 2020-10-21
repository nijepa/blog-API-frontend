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
        <button type="submit" class="btn__sub" value="Log In" >Log In</button>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
      <div v-else class="btn-oposite">
        <p>Already sign up ?</p>
        <button @click="changeType('login')" class="btn__sub">Log In</button>
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
        <button type="submit" class="btn__sub">Sign Up</button>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
      <div v-else class="btn-oposite">
        <p>Don't have username ?</p>
        <button @click="changeType('signup')" class="btn__sub">Sign Up</button>
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

<style lang="scss">
  input, button, textarea {
    font-family: 'Chewy', cursive;
  }

  .cool-link {
    background: #fff;
    color: #525865;
    border-radius: 4px;
    border: 1px solid #d1d1d1;
    box-shadow: inset 1px 2px 8px rgba(0, 0, 0, 0.07);
    font-family: inherit;
    font-size: 1em;
    line-height: 1.45;
    outline: none;
    padding: 0.6em 1.45em 0.7em;
    -webkit-transition: .18s ease-out;
    -moz-transition: .18s ease-out;
    -o-transition: .18s ease-out;
    transition: .18s ease-out;
    margin-bottom: 1em;
  }
  .cool-link:hover, .cool-link:focus {
    color: #4b515d;
    border: 1px solid #B8B6B6;
    box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
/* .cool-link:focus {
  color: #4b515d;
  border: 1px solid #B8B6B6;
  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01), 0px 0px 8px rgba(0, 0, 0, 0.2);
} */
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
/*   .cool-link {
    display: inline-block;
    background-color: transparent;
    border-left: 1px solid transparent;
    border-top: 1px solid transparent;
    text-align: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #2c3e50;
    border-right: 1px solid #2c3e50;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 2px 2px transparent;
  }
  .cool-link:hover {
    border: 1px solid indigo;
    transition: border .9s; 
    box-shadow: 2px 2px #888888;
  }
  .cool-link:focus {
    border: 1px solid indigo;
    box-shadow: 2px 2px #888888;
  } */
  .btn__sub {
    text-transform: uppercase;
    border: none;
    font-weight: bolder;
    border-left: 2px solid transparent;
    border-bottom: 2px inset rgb(3, 168, 105);
    border-right: 2px inset rgb(3, 168, 105);
    border-top: 2px solid transparent;
    border-radius: 50%;
    background: transparent;
    justify-self: center;
    padding: 1em;
    margin: .5em;
    cursor: pointer;
    box-shadow: 2px 2px transparent;
    transition: .9s ease-out;
  }
  .btn__sub:hover {
    border-bottom: 2px inset rgb(1, 85, 53);
    border-top: 2px inset rgb(1, 85, 53);
    border-right: 2px inset rgb(1, 85, 53);
    color: rgb(1, 85, 53);
    box-shadow: 1px 1px #B8B6B6;
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