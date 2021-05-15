<template>
  <div :class="boxClasses" :style="aspectRatio">
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="js">

import { toRefs, computed } from 'vue';

import { useClasses } from './composables/useClasses';

export default {
  props: {
    box: {
      type: [Array, String],
      default: '',
    },

    content: {
      type: [Array, String],
      default: '',
    },

    aspect: {
      type: Array,
      default: () => [16, 9],
      validator: (value) => value.every((x) => typeof x === 'number'),
    },
  },

  setup(props) {
    const { box, content } = toRefs(props);
    const boxClasses = useClasses(box, 'aspect-box');
    const contentClasses = useClasses(content, 'aspect-box__content');

    const aspectRatio = computed(() => {
      const [x, y] = props.aspect;

      return `--aspectRatio: calc((${x} / ${y}) * 100%);`;
    });

    return {
      boxClasses,
      contentClasses,

      aspectRatio,
    };
  },
};

</script>

<style scoped lang="postcss">

.aspect-box {
  @apply relative;

  &:before {
    @apply w-full;
    @apply block;

    content: '';
    padding-top: var(--aspectRatio);
  }

  &__content {
    @apply absolute top-0 left-0 bottom-0 right-0;
  }
}

</style>
