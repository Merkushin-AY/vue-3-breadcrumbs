<template>
  <nav
      v-if="$breadcrumbs && $breadcrumbs.length && (showCurrentCrumb || !$breadcrumbs[0].current)"
      class="am-breadcrumbs"
  >
    <ol
        class="am-breadcrumbs__list"
    >
      <template
          v-for="(crumb, idx) in $breadcrumbs"
      >
        <li
          v-if="showCurrentCrumb || !crumb.current"
          class="am-breadcrumbs__item"
        >
          <slot name="crumb" :crumb="crumb">
            <span
                v-if="crumb.current"
                class="am-breadcrumbs__link am-breadcrumbs__link_current"
            >
              {{ crumb.label }}
            </span>
            <router-link
                v-else
                class="am-breadcrumbs__link"
                :to="crumb.link"
            >
              {{ crumb.label }}
            </router-link>
            <div class="am-breadcrumbs__separator">
              /
            </div>
          </slot>
        </li>
      </template>

    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AmBreadcrumbs',
  props: {
    showCurrentCrumb: {
      type: Boolean,
      default: true,
    },
  }
}
</script>

<style>
.am-breadcrumbs {
  display: flex;
  margin: 16px 16px;
}

.am-breadcrumbs__list {
  display: block;
  padding: 0;
  margin: 0;
  text-align: left;
}

.am-breadcrumbs__item {
  display: inline;
}

.am-breadcrumbs__separator {
  display: inline;
  padding: 0 4px;
  color: rgb(150, 159, 175);
}

.am-breadcrumbs__link {
  display: inline;
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.2s;
}

.am-breadcrumbs__link:hover {
  color: #3eaf7c;
}

.am-breadcrumbs__link.am-breadcrumbs__link_current {
  color: rgb(150, 159, 175);
}

.am-breadcrumbs__item:last-child .am-breadcrumbs__separator {
  display: none;
}
</style>