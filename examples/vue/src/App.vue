<script>
export default {
  name: 'App',
}
</script>

<template>
  <header>
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/catalog">Catalog</router-link>
      <router-link to="/catalog/1">Item</router-link>
      <router-link to="/catalog/1/12">Sub Item</router-link>
    </nav>
  </header>

  <AmBreadcrumbs/>
<!--  <AmBreadcrumbs>-->
<!--    <template #crumb="{ crumb }">-->
<!--      <router-link-->
<!--          class="my-custom-crumb"-->
<!--          :to="crumb.link"-->
<!--      >-->
<!--        {{ crumb.label }}-->
<!--      </router-link>-->
<!--    </template>-->
<!--  </AmBreadcrumbs>-->

  <router-view></router-view>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
</style>
