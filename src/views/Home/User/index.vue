<!--  -->
<template>
  <div>
    user
    <router-link to="/About">跳转到About</router-link>
    <router-link to="/Wjl/Wjl1">跳转到Wjl1</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {}
  },

  components: {},

  computed: {},

  methods: {},
}
</script>
<style lang="scss" scoped></style>
