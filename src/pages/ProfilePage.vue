<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 bg-primary mt-2 text-light">
        <h3>{{ profile.email }}</h3>

        <h2>
          <a v-if="profile.linkedin" :href="profile.linkedin"
            ><i class="mdi mdi-linkedin"></i
          ></a>
        </h2>
        <!-- <h2 class="selectable">Github <span ></span></h2> -->
        <h2>
          <a v-if="profile.github" :href="profile.github">
            <i class="mdi mdi-heart"></i>
          </a>
        </h2>
        <h2>
          <a v-if="profile.resume" :href="profile.resume">
            <i class="mdi mdi-heart"></i>
          </a>
        </h2>
      </div>
      <CreateForm v-if="account.id == profile.id" />
      <div class="col-7" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAll({ creatorId: route.params.id });
        }
      } catch (error) {}
    });
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>