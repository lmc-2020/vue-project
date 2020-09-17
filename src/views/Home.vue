<template>
  <div>
    <div class="left-menu">
      <leftItem />
    </div>
    <div class="right-content" :class="opened ? '' : 'is-close'">
      <topItem />
      <div class="content">
        <transition :name="transitionName">
          <router-view :hasMenu="true" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { leftItem, topItem } from "@/views/menu";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      // 可以根据路由的变化，改变这个值，在css里写上对应的动画，可以实现前进、后退的不同动画效果
      transitionName: "slide-scale"
    };
  },
  components: {
    leftItem,
    topItem
  },
  computed: {
    ...mapGetters(["opened"])
  }
};
</script>
