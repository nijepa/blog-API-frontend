<template>
  <div class="footer">
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
    border: 2px solid rgb(7, 72, 110);
    background-color: rgb(69, 173, 221);
    /* padding: 5px; */
    border-radius: 5px;
    /* margin: 30px; */
/*     position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000000000000; */
  }
</style>