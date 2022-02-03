<template>
  <div>
    <header>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/catalog">Catalog</NuxtLink>
        <NuxtLink to="/catalog/1">Item</NuxtLink>
        <NuxtLink to="/catalog/1/12">Sub Item</NuxtLink>
      </nav>
    </header>

    <AmBreadcrumbs/>

    <main>
      <slot/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'defaultLayout',
}
</script>

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
