<template>
  <div>
    <h1>
      Catalog page
    </h1>
    <button @click="changeBC">Change bc</button>
    <NuxtLink
        :to="$route.fullPath + '#special'"
    >
      Test hash
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'catalogPage',
  setup() {
    definePageMeta({
      breadcrumb: {
        link: '/catalog#special',
        label: 'Catalog special',
      }
    })
  },
  mounted() {
    console.log('Breadcrumbs in mounted', this.$breadcrumbs)
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