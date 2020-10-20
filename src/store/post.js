import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const URL = 'http://localhost:4000/';
import apiClient from './api_client';
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    inputType: '',
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
  },

  actions: {

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
            //console.log(error.response)
            commit('setErrors', error.response.data.error);
          } else {
            commit('setErrors', error);
          }
        })
    },

    async createComment({commit}, commentData) {
      await apiClient.post(URL + 'posts/comment', commentData)
        .then((response) => {
          //console.log(response);
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
  },

  modules: {
    
  }
})
