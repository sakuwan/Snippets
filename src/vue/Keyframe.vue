<script lang="js">

import {
  h,
  ref,
  computed,

  onMounted,
} from 'vue';

export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },

    classes: {
      type: [Array, String],
      default: '',
    },

    loop: {
      type: Boolean,
      default: true,
    },

    pause: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const mainClasses = computed(
      () => (typeof props.classes === 'string' ? props.classes : props.classes.join(' ')),
    );

    const frameData = computed(() => {
      const componentSlots = context.slots.default ? context.slots.default() : [];
      return componentSlots.map((slot) => Number(slot.props?.duration ?? 1000));
    });

    const frameTimer = ref(0);
    const currentFrame = ref(0);

    const delayFrame = (fn) => {
      const frameDelay = frameData.value[currentFrame.value] || 0;

      clearTimeout(frameTimer.value);
      frameTimer.value = setTimeout(fn, frameDelay);
    };

    const nextFrame = () => {
      if (!props.pause) {
        delayFrame(() => {
          const { length } = frameData.value;
          if (currentFrame.value < length - 1) {
            currentFrame.value += 1;
            nextFrame();
          } else if (props.loop) {
            currentFrame.value = 0;
            nextFrame();
          }
        });
      }
    };

    onMounted(() => nextFrame());

    return {
      mainClasses,

      frameData,
      frameTimer,
      currentFrame,

      delayFrame,
      nextFrame,
    };
  },

  render() {
    const componentAttributes = this.classes.length > 0
      ? { class: this.mainClasses }
      : {};

    const activeFrame = this.$slots.default
      ? this.$slots.default()[this.currentFrame]
      : [];

    return h(this.tag, componentAttributes, activeFrame);
  },
};

</script>
