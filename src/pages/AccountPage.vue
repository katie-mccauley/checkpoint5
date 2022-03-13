<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row justify-content-center text-center">
    <h1>Create a Post</h1>
    <CreateForm />
  </div>
  <div class="row justify-content-center text-center">
    <h1>Edit your Account</h1>
    <EditAccount />
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
export default {
  name: "Account",
  setup() {
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
