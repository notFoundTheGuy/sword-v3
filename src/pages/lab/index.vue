<template>
  <section>
    <div class="main-menu">
      <a-menu mode="inline" style="width: 100%" @select="onMenuSelect">
        <a-sub-menu v-for="(item, index) in menu" :key="index">
          <template #title>
            {{ item.name }}
          </template>

          <a-menu-item v-for="subItem in item.children" :key="subItem.route">
            {{ subItem.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>

    <div class="main-content">
      <router-view></router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import LabList from "./LabList";

export default defineComponent({
  name: "Lab",
  setup(props, context) {
    let menu = ref();
    const router = useRouter();

    const onMenuSelect = (item: any) => {
      console.log(item);
      router.push(item.key);
    };

    onMounted(() => {
      menu.value = LabList;
    });

    return {
      menu,
      onMenuSelect,
    };
  },
});
</script>

<style lang="less" scoped>
.main-content {
  position: relative;
}
</style>
