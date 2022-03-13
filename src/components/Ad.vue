<template>
  <h3 class="text-center">
    <a :href="ad.linkURL">{{ ad.title }}</a>
  </h3>
  <img class="img-fluid rounded" :src="ad.banner" />
</template>


<script>
export default {
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>