<template>
  <a-menu
    mode="inline"
    style="width: 100%"
    v-model:selectedKeys="selectedKeys"
    :openKeys="openKeys"
  >
    <a-sub-menu
      v-for="item in menu"
      :key="item._id"
      @titleClick="onSubMenuClick(item)"
    >
      <template #title>
        {{ item.name }}
      </template>

      <a-menu-item v-for="subItem in item.children" :key="subItem.id">
        {{ subItem.name }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { fetchDir } from "../api/directory";

export default defineComponent({
  async setup(props, context) {
    let state = reactive({
      menu: [],
      openKeys: [""],
      selectedKeys: [""],
    });

    const onSubMenuClick = (item: any) => {
      // 只展开一个
      state.openKeys = [item._id];
    };

    watch(
      () => state.selectedKeys,
      function () {
        context.emit("update:value", state.selectedKeys[0]);
      }
    );

    state.menu = await fetchDir();

    return {
      ...toRefs(state),
      onSubMenuClick,
    };
  },
});
</script>
