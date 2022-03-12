<template>
  <div class="container-fluid">
    <button @click="changePage(previousPage)" class="btn btn-info me-2">
      New
    </button>
    <button @click="changePage(nextPage)" class="btn btn-danger">Old</button>
    <div class="row justify-content-center">
      <div class="col-7" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
      <div class="col-3" v-for="a in ads" :key="a.id">
        <Ad :ad="a" />
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { adsService } from "../services/AdsService";
export default {
  name: "Home",

  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
        await adsService.getAllA();
      } catch (error) {
        logger.error(error);
      }
    });
    watchEffect(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      async changePage(page) {
        try {
          await postsService.changePage(page);
        } catch (error) {
          logger.error(error);
        }
      },
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.newPage),
      previousPage: computed(() => AppState.oldPage),
      ads: computed(() => AppState.all),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
