<template>
  <div class="row justify-content-center">
    <div class="col-md-12 bg-light rounded shadow m-3 card">
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
          <h1>
            <i
              @click="deletePost"
              v-if="account.id == post.creator.id"
              class="mdi mdi-alpha-x"
            ></i>
          </h1>
        </div>
      </div>
      <h2 class="text-danger">{{ post.creator.name }}</h2>
      <img
        v-if="post.imgUrl"
        :src="post.imgUrl"
        alt=""
        class="img-fluid rounded"
      />
      <div>
        <p>Post updated: {{ new Date(post.createdAt).toLocaleString() }}</p>
      </div>
      <h2>{{ post.body }}</h2>

      <div>
        <i class="mdi mdi-heart selectable" @click="like"></i>
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
import Pop from "../utils/Pop";

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
          if (await Pop.confirm()) {
            postsService.deletePost({ id: props.post.id });
          }
        } catch (error) {
          logger.error(error);
        }
      },
      get Time() {
        return moment(this.createdAt).startOf("hour").fromNow();
      },
      likes: computed(() => AppState.likes),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
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

.crop-posting {
  max-height: 100px;
}
</style>