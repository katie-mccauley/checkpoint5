<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row flex-row">
        <div class="col-md-6">
          <router-view />
        </div>
        <div class="col-md-2 d-flex flex-column" v-for="a in ads" :key="a.id">
          <Ad :ad="a" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "./AppState";
import { adsService } from "./services/AdsService";
import { logger } from "./utils/Logger";
export default {
  name: "App",
  setup() {
    onMounted(async () => {
      try {
        await adsService.getAllA();
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.all),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
