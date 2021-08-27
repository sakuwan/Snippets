<template lang="pug">

div(:style="aspectStyle" :class="[wrapperClasses, 'aspect-box']")
  div(:class="[contentClasses, 'aspect-box__content']")
    slot

</template>

<script>

import { computed } from 'vue';

import { isNumber } from './utils/isType';
import { makeClassProps, makeSingleTypedProps } from './utils/propHelpers';

export default {
  props: {
    ...makeClassProps({
      wrapperClasses: '',
      contentClasses: '',
    }),

    ...makeSingleTypedProps({ aspectRatio: 16 / 9 }),
  },

  setup(props) {
    const aspectStyle = computed(() => {
      const paddingRatio = Number(props.aspectRatio);
      return isNumber
        ? { paddingTop: `${(1 / paddingRatio) * 100}%` }
        : undefined;
    });

    return { aspectStyle };
  },
};

</script>

<style scoped lang="pcss">

.aspect-box {
  @apply relative;

  &:before {
    @apply w-full;
    @apply block content-[''];
  }

  &__content {
    @apply absolute top-0 left-0 bottom-0 right-0;
  }
}

</style>
