<template>
  <div class="">
    <transition name="slide-fade">
      <form @submit.prevent="userUpdate(signupInput)" method="post" class="log">
        <label for="email">E-Mail</label>
        <input @focus="clearErrors" v-model="signupInput.email" type="email" name="email" class="cool-link" placeholder="e-mail" required>
        <label for="password">Password</label>
        <input @focus="clearErrors" v-model="signupInput.password" type="password" name="password" class="cool-link" placeholder="password" required>
        <label for="username">User Name</label>
        <input @focus="clearErrors" v-model="signupInput.username" type="text" name="username" class="cool-link" placeholder="user name" required>
        <label for="first_name">First Name</label>
        <input @focus="clearErrors" v-model="signupInput.first_name" type="text" name="first_name" class="cool-link" placeholder="first name" required>
        <label for="last_name">Last Name</label>
        <input @focus="clearErrors" v-model="signupInput.last_name" type="text" name="last_name" class="cool-link" placeholder="last name" required>
        <div class="">
          <button type="submit" class="btn__sub" value="Log In" >Save</button>
          <button @click="cancelUpdate()" class="btn__sub" value="Log In" >Cancel</button>
        </div>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import router from '../router';

export default {
  name: 'PostAdd',
  data() {
    return {
      signupInput: {
        _id: '',
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: ''
      },
    }
  },
  computed: {
    ...mapGetters(['loggedUser', 'getErrors']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions([ 'signup', 'clearErrors', 'userUpdate' ]),
    setInput() {
      this.clearErrors;
    },
    initUser() {
      this.signupInput =  {
        _id: this.user._id,
        email: this.user.email,
        password: this.user.password,
        username: this.user.username,
        first_name: this.user.first_name,
        last_name: this.user.last_name
      }
    },
    cancelUpdate() {
      router.push('/')
    }
  },
  created() {
    this.initUser();
  }
}
</script>

<style>
  label {
    font-size: 14px;
    color: darkgray;
  }
</style>