<template>
  <div >
    <div v-if="!allPosts" class="">
      <p>no posts</p>
    </div>
    <transition-group name="fade"  v-else class="posts">
    <div v-for="post in allPosts" :key="post._id" class="post">
      <p class="post__heading">By: {{ post.user.name }} @ {{ post.createdAt | formatDate }} </p>
      <h1 class="title__text">{{ post.title }}</h1>
      <hr class="title__line">
      <p v-html="post.text"></p>
      <div v-if="isLogged" class="">
        <button v-if="loggedUser._id === post.user._id" @click="editPost(post)" type="submit" class="btn__sub">Edit Post</button>
      </div>
      <hr>
      <div class="comments">
        <h2>Comments</h2>
        <div class="">
          <transition-group name="fade">
            <div v-for="comment in post.comments" :key="comment._id" class="">
              <p v-html="comment.text"></p>
              <p class="post__heading">By: {{ comment.author.name }} @ {{ comment.createdAt | formatDate }}</p>
            </div>
          </transition-group>
        </div>
      </div>
      
      <!-- <Comments /> -->
      <!-- <button @click="addComment" class="btn__comment" v-if="isLogged && !enterComment">Add Comment</button> -->
      <div v-if="isLogged" class="add__comment">
        <button @click="newComment(commentInput, post._id)" type="submit" 
                class="btn__sub btn__com">Add Comment</button>
<!--         <editor v-model="commentInput.text" name="comment"
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
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help | fontsizeselect fontselect'
          }"
        /> -->
        <textarea v-model="commentInput.text" name="comment" class="cool-link" 
                  placeholder="enter comment" rows="3" cols="10" required>
        </textarea>
      </div>
      <div v-else class="add__comment">
        <p>Please <router-link class="fromLeft" to="/login">Log In</router-link> to add comments.</p>
      </div>
    </div>
    </transition-group>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  // import Editor from '@tinymce/tinymce-vue';

  export default {
    name: 'Posts',
    components: {
      // Editor
    }, 
    data() {
      return {
        enterComment: false,
        commentInput: {
          id: '',
          text: '',
          user: ''
        }
      }
    },
    computed: {
      ...mapGetters(['allPosts', 'isLogged', 'loggedUser', 'getPostAdd']),
    },
    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('LLLL')
        }
      }
    },
    methods: {
      ...mapActions([
        'loadPosts', 'createComment', 'postType'
      ]),
      addComment() {
        this.enterComment = true;
      },
      newComment(data, id) {
        this.commentInput.id = id;
        this.commentInput.user = this.loggedUser._id;
        this.createComment(this.commentInput);
      },
      editPost(post) {
        this.postType(post);
      }
    },
    created() {
      this.loadPosts();
    }
  }
</script>

<style>

  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    min-width: 414px;
  }

  .post {
    text-align: left;
    /* box-shadow: 0px 2px 3px 0px rgba(56, 100, 52, 0.75); */
    margin: 5px ;
    padding: 10px;
    /* border-radius: 5px; */
    /* border: 1px solid grey; */
/*     border-left: 2px solid green;
    border-bottom: 2px solid green; */
    display: block;
    line-height: 1.2em;
    font-size: 90%;
background-position:  0 0, 0 0, 100% 0, 0 100%;
    background-size: 3px 100%, 100% 3px, 3px 100% , 100% 3px;
    background-repeat: no-repeat;
    background-image:
        linear-gradient(0deg, transparent 20%, green 100%, green 50%, transparent 50%), 
        linear-gradient(90deg, transparent 20%, green 100%, green 50%, transparent 50%), 
        linear-gradient(180deg, transparent 20%, green 100%, green 50%, transparent 50%), 
        linear-gradient(270deg, transparent 20%, green 100%, green 50%, transparent 50%) 
    ;

  }

  .post__heading {
    color: rgb(114, 114, 114);
    /* bordrgba(114, 114, 114, 0.103)id black; */
    background: #c2f0bc;
    padding: 2px 5px;
    display: inline;
    border-radius: 5px;
    font-size: 12px;
  }

  .post p {
    margin: 0;
    margin-top: 1em;
  }

  .title__text {
    margin-bottom: .3em;
  }
/*   .btn__comment {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
    background: transparent;
    margin: 5px;
    padding: 10px;
    font-family: 'Chewy', cursive;
  }
  .btn__comment:hover {
    background-color: indigo;
    border: 2px solid black;
    color: white;
  } */
  .add__comment {
    display: grid;
    grid-template-columns: 1fr 4fr;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
  }

  .comments {
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: 1fr 4fr;
    grid-column-gap: 10px;
    align-items: baseline;
  }

  .btn__com {
    font-size: .8em;
  }

  .fade-enter { /* starting style */
    opacity: 0;
  }
  
  .fade-enter-active { /* entering style */
    transition: opacity 1s ease-out; 
  }

  @media (max-width: 1440px) {
    .posts {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 810px) {
    .posts {
      grid-template-columns: 1fr;
      
    }
  }
  @media (max-width: 360px) {
    .posts {
      grid-template-columns: auto;
      max-width: 350px;
    }
  }
</style>