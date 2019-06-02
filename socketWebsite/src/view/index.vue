<template>
      <router-view></router-view>


</template>

<script>
  import { mapActions } from 'vuex';
  export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed:{
  },
  mounted: function () {/*渲染前执行*/
    this.connectSocket();
  },
  methods: {
    ...mapActions(['connectSocket']),
  }
}
</script>
