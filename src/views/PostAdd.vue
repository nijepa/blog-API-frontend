<template>
<transition name="fade">
  <div class="">
    <!-- <transition name="slide-fade"> -->
      <form @submit.prevent="addPost()" method="post" class="log">
        <!-- <label for="email">E-Mail</label> -->
        <input @focus="clearErrors" v-model="postInput.title" type="text" name="title" class="cool-link" placeholder="pls enter title" required>
        <!-- <label for="password">Password</label> -->
        <editor @focus="clearErrors"  v-model="postInput.text" name="text" placeholder="pls enter content"
          api-key="2guq5wvvizaji79tec92yznr95h8nlnk69m7n7qx7k2lxdpl"
          :init="{
            content_css: ['https://fonts.googleapis.com/css2?family=Chewy&display=swap'],
            font_formats:'Chewy',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor link | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help | fontsizeselect fontselect'
          }"
        />
        <!-- <textarea @focus="clearErrors" v-model="postInput.text" name="text" class="cool-link" placeholder="pls enter content" required></textarea> -->
        <div class="">
          <button type="submit" class="btn__sub" value="Log In" >Save</button>
          <button @click="cancelAdd()" class="btn__sub" value="Log In" >Cancel</button>
        </div>
        
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
    <!-- </transition> -->
  </div>
</transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Editor from '@tinymce/tinymce-vue'
import router from '../router';

export default {
  name: 'PostAdd',
  components: {
      Editor
    }, 
  data() {
    return {
      postInput: {
        _id: '',
        title: '',
        text: '',
        user: ''
      },
    }
  },
  computed: {
    ...mapGetters(['loggedUser', 'getErrors', 'getSelectedPost']),
  },
  methods: {
    ...mapActions([ 'createPost', 'postUpdate', 'clearErrors' ]),
    addPost() {
      if (this.getSelectedPost._id) {
        this.postUpdate(this.postInput);
      } else {
        this.postInput.user = this.loggedUser._id;
        this.createPost(this.postInput);
      }
    },
    cancelAdd() {
      router.push('/')
    }
  },
  created() {
    if (!this.loggedUser) {
      router.push('/login');
    }
    if (this.getSelectedPost) {
      this.postInput = {_id: this.getSelectedPost._id,
                        title: this.getSelectedPost.title,
                        text: this.getSelectedPost.text,
                        user: this.getSelectedPost.user}
      // todo
    }
  },
  mounted() {
    console.log(this.loggedUser)
    
  }
}
</script>

<style>

</style>