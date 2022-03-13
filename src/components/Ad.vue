<template>
  <h3 class="text-center">
    {{ ad.title }}
  </h3>
  <img class="img-fluid rounded" :src="ad.square" />
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