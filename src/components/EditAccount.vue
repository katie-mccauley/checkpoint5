<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="editProfile"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Picture</label>
      <input
        v-model="state.editable.picture"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Name</label>
      <input
        v-model="state.editable.name"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Bio</label>
      <input
        v-model="state.editable.bio"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Linkedin</label>
      <input
        v-model="state.editable.linkedin"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">GitHub</label>
      <input
        v-model="state.editable.github"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Resume</label>
      <input
        v-model="state.editable.resume"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Cover Image</label>
      <input
        v-model="state.editable.coverImg"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-2 mb-2">
      <label for="" class="form-label">Alumni Status</label>
      <input
        v-model="state.editable.graduated"
        type="checkbox"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Class</label>
      <input
        v-model="state.editable.class"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">Edit</button>
    </div>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
import { Modal } from "bootstrap";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async editProfile() {
        try {
          await accountService.editProfile(state.editable);
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