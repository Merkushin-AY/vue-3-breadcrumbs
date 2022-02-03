<template>
  <div>
    <h2>
      Sub item {{ $route.params.sub }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'subItemPage',
  setup() {
    definePageMeta({
      breadcrumb: (route) => {
        return `SubItem ${route.params.sub}`
      }
    })
  },
}
</script>

<style scoped>

</style>