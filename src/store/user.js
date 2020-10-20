import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const URL = 'http://localhost:4000/';
import apiClient from './api_client';
import saveToken from './local_storage';
import userModule from './user';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authKey: '',
    user: {},
    users: [],
    posts: [],
    comments: [],
    logged: false,
    loading: true,
    inputType: '',
    errors: []
  },

  getters: {
    getAuthKey: state => state.authKey,
    allPosts: state => state.posts,
    allComments: state => state.comments,
    allUsers: state => state.users,
    loggedUser: state => state.user,
    loadingState: state => state.loading,
    isLogged: state => state.logged,
    getInputType: state => state.inputType,
    getErrors: state => state.errors
  },  

  mutations: {
    setToken: (state, authKey) => (state.authKey = authKey),

    setUser: (state, user) => (state.user = user),

    updatePosts(state, posts) {
      state.posts = posts;
    },

    updateComments(state, comments) {
      state.comments = comments;
    },

    addPost({ posts }, text) {
			posts.push({
				text
			})
    },
    
    addComment (state, comment) {
      const objIndex = state.posts.map(function(x) {return x._id; }).indexOf(comment._id);
      Object.assign(state.posts[objIndex], { comments: comment.comments });
    },

    changeLoadingState(state, loading) {
      state.loading = loading;
    },

    setLogged(state, logged) {
      state.logged = logged;
    },

    setErrors(state, errors) {
      state.errors = errors;
    },
  },

  actions: {
    initialState({commit}) {
      const localAuth = JSON.parse(localStorage.getItem('nijepa_blog_user'));
      if (localAuth) {
        commit('setToken', localAuth.token);
        commit('setUser', localAuth.user);
        commit('setLogged', true);
        commit('changeLoadingState', false);
      }
    },

    async signup({commit}, signupData) {
      await axios.post(URL + 'users/signup', signupData)
        .then((response) => {
          // console.log(response.data, this)
          commit('setUser', response.data.user);
          commit('setToken', response.data.token);
          commit('setLogged', true);
          router.push("/")
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            commit('setErrors', error.response.data.error);
          } else {
            commit('setErrors', error);
          }
        })
    },

    async login({commit}, loginData) {
      await axios.post(URL + 'users/login', loginData)
        .then((response) => {
          saveToken(response.data);
          commit('setUser', response.data.user);
          commit('setToken', response.data.token);
          commit('setLogged', true);
          router.push("/")
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            commit('setErrors', error.response.data.error);
          } else {
            commit('setErrors', error);
          }
        })
    },

    async logout({commit}, loginData) {
      console.log(loginData)
      await apiClient.post(URL + 'users/me/logout', loginData)
        .then((response) => {
          commit('setUser', response.data.user);
          commit('setToken', response.data.token);
          commit('setLogged', false);
          localStorage.removeItem('nijepa_blog_user');
          router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            commit('setErrors', error.response.data.error);
          } else {
            commit('setErrors', error);
          }
        })
    },

    async fetchUser ({ commit }) {
      const response = await apiClient.get(URL + "users/me");
      commit('setUser', response.data);
      commit('setLogged', true);
      commit('changeLoadingState', false)
    },

    async loadPosts({ commit }) {
      await axios.get(URL + 'posts').then((response) => {
        commit('updatePosts', response.data);
        commit('changeLoadingState', false);
      })
    },

    async loadComments({ commit }) {
      await axios.get(URL + 'comments').then((response) => {
        commit('updateComments', response.data)
        commit('changeLoadingState', false)
      })
    },

    async createPost({commit}, postData) {
      await apiClient.post(URL + 'posts', postData)
        .then((response) => {
          commit('addPost', response.data);
          router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            commit('setErrors', error.response.data.error);
          } else {
            commit('setErrors', error);
          }
        })
    },

    async createComment({commit}, commentData) {
      await apiClient.post(URL + 'posts/comment', commentData)
        .then((response) => {
          console.log(response);
          commit('addComment', response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            commit('setErrors', error.response.data.error);
          } else {
            commit('setErrors', error);
          }
        })
    },

    clearErrors({ commit }) {
      commit('setErrors', [])
    }
  },

  modules: {
    userModule
  }
})
