<template>
  <div class="component">
    <div class="row">
      <div class="col-10 bg-primary text-light">
        {{ profile.email }}
        {{ profile.name }}
        <a v-if="profile.linkedin" :href="profile.linkedin"
          ><i class="mdi mdi-linkedin"></i
        ></a>
      </div>
      <CreateForm v-if="account.id == profile.id" />
      <div class="col-3" v-for="p in posts" :key="p.id">
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