<template>
  <main :class="[$route.name]" class="main px-4 md:px-0">
    <div class="container mx-auto outer glitch">
      <site-header />
      <nuxt class="nuxt" />
    </div>

    <site-footer />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SiteHeader from '@/components/partials/header.vue';
import SiteFooter from '@/components/partials/footer.vue';

@Component({
  components: {
    SiteHeader,
    SiteFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

.divider {
  position: relative;
  min-width: 100vw;
  margin-top: auto;
}

body {
  background: black;
  color: white;
  font-family: 'Playfair Display', serif;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
    border: 10px double #fff;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #de1142;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #11c4df;
  }
}
.nuxt {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  border: 10px double#11C4DF;
  padding: 5%;
}

main {
  scroll-behavior: smooth;
}
</style>
