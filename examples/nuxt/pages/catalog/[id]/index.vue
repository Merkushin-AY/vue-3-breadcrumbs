<template>
  <div>
    <h1>
      Item page {{ $route.params.id }}
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'itemPage',
  setup() {
    definePageMeta({
      breadcrumb: (route) => {
        return `Item ${route.params.id}`
      }
    })
  },
}
</script>

<style scoped>

</style>