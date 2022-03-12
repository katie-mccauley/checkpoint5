<template>
  <form
    class="bg-grey darken-20 justify-content-center elevation-3 col-8 p-2 m-5"
    @submit.prevent="createPost"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Body</label>
      <input
        v-model="state.editable.body"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">cover image</label>
      <input
        v-model="state.editable.imgUrl"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>



<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.editable);
          state.editable = {};
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>