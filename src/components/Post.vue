<template>
  <div class="row">
    <div class="col bg-light">
      <img
        :src="post.creator.coverImg"
        class="img-fluid crop selectable"
        alt=""
        @click="goToProfile"
      />
      <h2 class="text-danger">{{ post.creator.name }}</h2>
      <h2>{{ post.body }}</h2>
      <button class="btn" @click="like">like</button>
      {{ post.likes.length }}
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";

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
    return {
      goToProfile() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
      async like() {
        await postsService.like(props.post);
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
</style>