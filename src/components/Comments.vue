<template>
  <div class="">
    <div v-if="!allComments" class="">
      <p>no Comments</p>
    </div>
    <div v-else v-for="comment in allComments" :key="comment._id" class="">
      <p>{{ comment.text }}</p>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Comments',
    data() {
      return {
        
        //loading: true,
        //user: {},
      }
    },
    computed: {
      ...mapGetters(['allComments']),
    },
    methods: {
      ...mapActions([
        'loadComments'
      ]),
/*       loadPosts() {
        //if(this.$gate.isAdmin()) {
          this.loadPosts();
          //this.user = this.loggedUser;
          
        //}
      }, */
    },
    created() {
      this.loadComments();
    }
  }
</script>

<style>

</style>