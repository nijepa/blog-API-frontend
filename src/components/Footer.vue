<template>
  <div class="footer">
    <hr>
    <p>Nikola Pavicevic @ {{ curr | formatDate }}</p>
  </div>
</template>

<script>
import moment from 'moment';

export default {

  name: 'Footer',

  data() {
    return {
      curr: new Date()
    }
  },
  
  filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('MMMM YYYY')
        }
      }
    },
}
</script>

<style>
  .footer {
    background-image: linear-gradient(to bottom, white, #c2f0bc 60%);
  }
</style>