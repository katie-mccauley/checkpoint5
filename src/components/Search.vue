<template>
  <form class="form-group row" @submit.prevent="search">
    <input
      v-model="searchTerm"
      type="text"
      class="col-md-9 col-8"
      placeholder="search...."
    />
    <button class="btn btn-outline-primary col-4 col-md-3">search</button>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const searchTerm = ref("");
    return {
      searchTerm,
      async search() {
        try {
          await postsService.getAll({ query: searchTerm.value });
        } catch (error) {
          logger.error(error);
        }
      },
      searchTerm,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>