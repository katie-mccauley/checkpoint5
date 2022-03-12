<template>
  <div class="row">
    <div class="col bg-secondary rounded shadow m-3">
      <div class="row justify-content-between">
        <div class="col-4">
          <img
            :src="post.creator.coverImg"
            class="img-fluid crop selectable"
            alt=""
            @click="goToProfile"
          />
        </div>
        <div class="col-4 d-flex justify-content-end">
          <i @click="deletePost" class="mdi mdi-delete"></i>
        </div>
      </div>
      <h2 class="text-danger">{{ post.creator.name }}</h2>
      <img
        v-if="post.imgUrl"
        :src="post.imgUrl"
        alt=""
        class="img-fluid crop-postimg"
      />
      <h2>{{ post.body }}</h2>

      <div>
        <i class="mdi mdi-heart" @click="like"></i>
        {{ post.likes.length }}
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";

export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    return {
      goToProfile() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
      async like() {
        await postsService.like(props.post);
      },
      async deletePost() {
        try {
          await postsService.deletePost({ id: props.post.id });
        } catch (error) {
          logger.error(error);
        }
      },
      likes: computed(() => AppState.likes),
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

.crop-postimg {
  height: 200px;
  max-width: 200px;
}
</style>