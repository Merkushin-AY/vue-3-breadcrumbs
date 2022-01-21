<template>
<h1>
  Item page {{ $route.params.id }}
</h1>
<router-view></router-view>
</template>

<script>
export default {
  name: 'itemPage',
}
</script>

<style scoped>

</style>