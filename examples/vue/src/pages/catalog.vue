<template>
  <h1>
    Catalog page
  </h1>
  <button @click="changeBC">Change bc</button>
  <router-link
    :to="$route.fullPath + '#special'"
  >
    Test hash
  </router-link>
</template>

<script>
export default {
  name: 'catalogPage',
  mounted() {
    console.log(this.$breadcrumbs)
  },
  methods: {
    changeBC() {
      this.$breadcrumbs[0].label = 'test'
    },
  },
}
</script>

<style scoped>

</style>