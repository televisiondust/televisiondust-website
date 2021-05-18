<template>
  <div>
    <CoolLightBox :items="images" :index="index" @close="index = null"> </CoolLightBox>

    <section class="home">
      <div class="py-24 md:py-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div class="flex flex-col w-full xl:w-3/5 justify-center lg:items-start overflow-y-hidden">
          <div v-html="$md.render(welcomeText)" class="home__welcome markdown" />
        </div>
        <div class="flex flex-col w-full xl:w-2/5">
          <img
            alt="Hero"
            class="rounded shadow-xl"
            src="https://source.unsplash.com/random/720x400"
          />
        </div>
      </div>
      <!-- <div v-if="loading">Loading..</div>
    <div v-else class="grid grid-cols-3 gap-4">
      <div v-for="feed in feeds" :key="feed">
        <img class="" :src="feed.media_url" alt="img" />
      </div>
    </div> -->
      <oneWaveInsta
        token="IGQVJXOFlsM3RKbWdBYklzeVJhYllTbkFaS3NzTWJuYzBaMDlOejB2T0JTM0R6RVluN2lGLWNpZAGprVTA3U1cxNU1wRm5OSHhUUFJpa3hKbHBCbXFuTUFoZAjVOQjd4aWRtemxjT2F6UEdnOUp4dG1TQgZDZD"
        fields="media_url,media_type,caption"
        class="grid lg:grid-cols-3 lg:grid-rows-9 lg:gap-10 grid-cols-2 gap-2 gridCont"
        :mediatypes="['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM']"
      >
        <template v-slot:loading="props">
          <h1 v-if="props.loading" class="fancy-loading">Loading, please wait...</h1>
        </template>

        <template v-slot:feeds="props">
          <img
            v-if="
              (props.feed.media_type === 'IMAGE') | (props.feed.media_type === 'CAROUSEL_ALBUM')
            "
            class="instaImg Image"
            :src="images[props.index]"
            @click="index = props.feed.index"
            @keydown="index = props.feed.index"
            alt=""
          />

          <video controls v-if="props.feed.media_type === 'VIDEO'" class="instaImg">
            <track src="captions_en.vtt" kind="captions" srclang="en" label="english_captions" />
            <source :src="props.feed.media_url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <!-- <div class="images-wrapper">
            <img
              class="image"
              v-for="(image, imageIndex) in images"
              :key="imageIndex"
              @click="index = imageIndex"
              @keydown="index = imageIndex"
              :src="props.feed.media_url"
              alt=""
            />
          </div>
        </div> -->
          <!-- <div>{{ props.feed.caption }}</div> -->
        </template>

        <template v-slot:error="props">
          <div class="fancy-alert">{{ props.error }}</div>
        </template>
      </oneWaveInsta>
    </section>
    <script src="skew.js"></script>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import settings from '@/content/settings/general.json';
import axios from 'axios';
import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';

@Component({
  // Called to know which transition to apply
  components: {
    oneWaveInsta: require('../components/oneWaveInsta').default,
    CoolLightBox,
  },
  transition() {
    return 'slide-left';
  },
})
export default class Home extends Vue {
  mounted(): void {
    this.insta();
  }

  welcomeText = settings.welcomeText;

  private token =
    'IGQVJXOFlsM3RKbWdBYklzeVJhYllTbkFaS3NzTWJuYzBaMDlOejB2T0JTM0R6RVluN2lGLWNpZAGprVTA3U1cxNU1wRm5OSHhUUFJpa3hKbHBCbXFuTUFoZAjVOQjd4aWRtemxjT2F6UEdnOUp4dG1TQgZDZD';

  private feeds: Array<unknown> = [];

  private fields = 'media_url,media_type,caption';

  private loading = true;

  private error = '';

  private images: Array<string> = [];

  private texts: Array<unknown> = [];

  // private index = null;

  get posts(): Post[] {
    return this.$store.state.posts;
  }

  insta(): void {
    axios
      .get('https://graph.instagram.com/me/media', {
        params: { access_token: this.token, fields: this.fields },
      })
      .then((response) => {
        this.loading = false;
        if (response.status === 400) this.error = response.data;
        console.log(this.error);
        if (response.status === 200) {
          for (let n = 0; n < response.data.data.length; n += 1) {
            this.feeds.push(response.data.data[n]);
            this.images.push(response.data.data[n].media_url);
            this.texts.push(response.data.data[n].caption);
            console.log(response.data.data[n]);
          }
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
</script>

<style lang="scss">
.home {
  transition: transform 0.35s;
  will-change: transform;
  transition-timing-function: ease;
  // overflow-y: scroll;
  // height: 80vh;
  // padding-right: 60px;
  /* width */
  .home__welcome markdown {
    color: white;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
    border: 10px double #dd1243;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #11c4df;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ffce2a;
  }
}
.instaImg {
  border: 15px double white;
  transition: 0.4s;
  &:hover {
    border: 10px double#FFCE2A;
    box-shadow: 15px 15px 0px 0px#E00F3C;
  }
}

.gridCont {
  img:nth-child(2n + 1) {
    margin-top: 100px;
  }
  img:nth-child(3n + 1) {
    margin-top: 200px;
    margin-bottom: 100px;
  }
  img:nth-child(4n) {
    margin-top: 180px;
  }
  img:nth-child(5n) {
    margin-top: 100px;
  }

  .grid img {
    border: 15px double white;
  }
}
</style>
