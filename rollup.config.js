import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/breadcrumbs.js',
  output: [
    {
      // file: 'dist/vue-breadcrumbs.common.js',
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named'
    },
    {
      // file: 'dist/vue-breadcrumbs.esm.js',
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named',
    },
    {
      file: 'dist/vue-breadcrumbs.min.js',
      format: 'iife',
      inlineDynamicImports: true,
      name: "VueBreadcrumbs",
      plugins: [terser()],
      globals: {
        vue: 'Vue'
      },
    },
  ],

  plugins: [
    vue({
      preprocessStyles: true
    }),
    postcss(), // It has to be used because css option in vue plugin is broken https://github.com/vuejs/rollup-plugin-vue/issues/410
    peerDepsExternal(),
  ],
}