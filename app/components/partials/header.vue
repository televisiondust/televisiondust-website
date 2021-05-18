<template>
  <div class="headercont">
    <header class="flex items-center py-0 md:py-8">
      <div class="header__logo">
        <nuxt-link to="/">
          <img :src="logo" alt="Logo" />
        </nuxt-link>
      </div>
    </header>

    <nav class="nav ml-auto flex items-center">
      <ul class="flex items-center sm:mt-4 sm:pt-4 md:mt-0 md:pt-0 md:mr-4 lg:mr-8">
        <li>
          <nuxt-link to="/blog" class="block font-medium px-4 py-1 md:p-2 lg:px-4">
            Blog
          </nuxt-link>
        </li>
        <li
          v-for="(page, index) in pages"
          :key="index"
          class="block font-medium px-4 py-1 md:p-2 lg:px-4"
        >
          <nuxt-link :to="`/${page.slug}`">{{ page.title }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import settings from '@/content/settings/general.json';

@Component
export default class Header extends Vue {
  get pages(): Page[] {
    return this.$store.state.pages;
  }

  logo = settings.logo;
}
</script>

<style lang="scss">
.headercont {
  $br: 200px;
  border: 10px double#FFCE2A;
  border-top-left-radius: $br;
  border-top-right-radius: $br;
  padding-bottom: 10px;
  margin-top: 10px;
  z-index: 100;
  background: radial-gradient(black 1px, transparent 2px),
    radial-gradient(white 1px, transparent 2px),
    linear-gradient(rgba(0, 0, 0, 0.8) 1px, transparent 0),
    linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(121, 9, 89, 1) 35%, rgba(0, 212, 255, 1) 100%);
  background-size: 109px 109px, 50px 50px, 100% 8px, 60px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  transition: 0.8s;
  animation: 30s ease infinite bgboi;
  background-attachment: fixed;
  &:hover {
    transform-origin: center center;
    background-size: 109px 109px, 109px 109px, 100% 60px, 100px 109px, 109px 109px;
  }
  @keyframes bgboi {
    0% {
      background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    }
    50% {
      background-position: 3054px 1055px, -600px 400px, 800px 300px, 1000px 2000px, 109px 109px;
    }
    100% {
      background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    }
  }
}

// div.headercont::after {
//   border: 20px solid white;
// }

.header__logo {
  max-width: 256px;
  margin: 0 auto;
  transition: 0.3s;
  &:hover {
    box-shadow: 10px 10px 0px 0px rgba(59, 164, 199, 0.75);
    border: 10px double#FFCE2A;
    background: rgba(0, 0, 0, 0.6);
  }
}
.nav {
  margin: 0 auto;
  align-items: center;
  // position: fixed;
  // left: 40vw;
  // top: 10vw;
  li {
    border: 10px double#E0103D;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-shadow: 2px 4px 3px rgba(17, 196, 223, 0.6);
    transition: 0.4s;
    box-shadow: 5px 5px 0px 0px rgba(59, 164, 199, 0.75);
    background: black;
    &:hover {
      text-shadow: 4px 5px 1px rgba(17, 196, 223, 1);
      box-shadow: 10px 10px 0px 0px rgba(255, 206, 42, 0.75);
      border: 10px double#fff;
    }
    &.nuxt-link-active {
      border: 10px double#FFCE2A;
    }
  }
  ul {
    margin: 0 auto;
  }
  ul li > a {
    &.nuxt-link-active {
      color: white;
      @apply font-bold;
    }
  }
}
</style>
