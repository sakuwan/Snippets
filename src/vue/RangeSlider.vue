<template lang="pug">

input(type="range" v-bind="$attrs" v-model.number="localValue")

</template>

<script>

import { computed } from 'vue';

import { makeSingleTypedProps } from './utils/propHelpers';

export default {
  emits: ['update:modelValue'],
  props: { ...makeSingleTypedProps({ modelValue: 0 }) },

  setup(props, { emit }) {
    const localValue = computed(({
      get: () => props.modelValue,
      set: (v) => emit('update:modelValue', v),
    }));

    return { localValue };
  },
};

</script>
