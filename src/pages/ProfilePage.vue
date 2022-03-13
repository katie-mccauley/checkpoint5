<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8 bg-primary mt-2 text-light shadow rounded">
        <div class="row justify-content-between">
          <div class="col-5">
            <img :src="profile.coverImg" class="img-fluid crop" alt="" />
            <h3>{{ profile.name }}</h3>
            <p>{{ profile.bio }}</p>
            <i v-if="profile.graduated" class="mdi mdi-account"></i>
          </div>
          <div class="col-2 d-flex justify-content-end">
            <b
              ><i
                v-if="account.id == profile.id"
                data-bs-toggle="modal"
                data-bs-target="#edit-account"
                class="mdi mdi-pencil selectable"
              >
              </i
            ></b>
          </div>
        </div>
        <h2 class="text-dark">
          <a v-if="profile.linkedin" :href="profile.linkedin">Linkedin</a>
          <a v-if="profile.github" :href="profile.github">Github</a>
          <a v-if="profile.resume" :href="profile.resume">Resume</a>
        </h2>
        <!-- <h2 class="selectable">Github <span ></span></h2> -->
        <!-- <h2>
          <a v-if="profile.github" :href="profile.github">
            <i class="mdi mdi-heart"></i>
          </a>
        </h2> -->
        <!-- <h2>
          <a v-if="profile.resume" :href="profile.resume">
            <i class="mdi mdi-heart"></i>
          </a>
        </h2> -->
      </div>
      <CreateForm v-if="account.id == profile.id" />

      <div class="col-7" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3">
        <button
          :disabled="!newest"
          @click="changePage(newest)"
          class="btn btn-info me-2"
        >
          New
        </button>
        <button
          :disabled="!old"
          @click="changePage(old)"
          class="btn btn-danger"
        >
          Old
        </button>
      </div>
    </div>
    <Modal id="edit-account">
      <template #title> Edit Account </template>
      <template #body><EditAccount /></template>
      <template #footer>This is the footer</template>
    </Modal>
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAll({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      newest: computed(() => AppState.newPage),
      old: computed(() => AppState.oldPage),
      async changePage(page) {
        try {
          await postsService.changePage(page);
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.crop {
  height: 70px;
  max-width: 70px;
  border-radius: 50%;
}
</style>