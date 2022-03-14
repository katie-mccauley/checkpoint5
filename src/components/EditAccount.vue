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
        v-model="editable.picture"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Please input image"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Name</label>
      <input
        v-model="editable.name"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name..."
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Bio</label>
      <input
        v-model="editable.bio"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Bio....."
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Linkedin</label>
      <input
        v-model="editable.linkedin"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Linkdedin link"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">GitHub</label>
      <input
        v-model="editable.github"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Github link"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Resume</label>
      <input
        v-model="editable.resume"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Resume Link"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Cover Image</label>
      <input
        v-model="editable.coverImg"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Profile Picture"
      />
    </div>
    <div class="col-2 mb-2">
      <label for="" class="form-label">Alumni Status</label>
      <input
        v-model="editable.graduated"
        type="checkbox"
        class=""
        aria-describedby="helpId"
      />
    </div>
    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Class</label>
      <input
        v-model="editable.class"
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Class name"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button data-bs-dismiss="modal" class="btn btn-primary">Edit</button>
    </div>
  </form>
</template>


<script>
import { reactive, ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { accountService } from "../services/AccountService";
import { Modal } from "bootstrap";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: {
    profileData: {
      type: Object,
      required: false,
      default: {},
    },
  },
  setup(props) {
    // const state = reactive({
    //   editable: {},
    // });
    const editable = ref({});
    watchEffect(() => {
      logger.log("change happened re-running watch effect");
      editable.value = props.profileData;
    });
    return {
      editable,
      async editProfile() {
        try {
          await accountService.editProfile(editable.value);
          // Modal.getOrCreateInstance(
          //   document.getElementById("form-modal")
          // ).hide();
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