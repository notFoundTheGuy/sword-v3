<template>
  <section class="lab-painter">
    <canvas id="canvas"></canvas>
    <ul class="operator">
      <li>
        <Icon name="pen" size="26"></Icon>
      </li>
      <li>
        <Icon name="circle" size="28"></Icon>
      </li>
      <li>
        <Icon name="rect" size="28"></Icon>
      </li>
      <li>
        <Icon name="eraser" size="28"></Icon>
      </li>
      <li>
        <Icon name="clear" size="28"></Icon>
      </li>
      <li>
        <Icon name="colors" size="28"></Icon>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { NButton, NH1, NText } from "naive-ui";
// @ts-ignore
import Painter from "./painter.js";

export default defineComponent({
  name: "Lab",
  components: {
    NButton,
    NH1,
    NText,
  },
  setup(props, context) {
    let painter, canvasEl;

    // TODO: 注意处理下onresize的情况
    const calcCanvasSize = () => {
      canvasEl = <HTMLCanvasElement>document.querySelector("#canvas");
      if (canvasEl) {
        canvasEl.width =
          document.querySelector(".main-content")?.clientWidth || 800;
        canvasEl.height =
          document.querySelector(".main-content")?.clientHeight || 500;
      }
    };

    // window.onresize = calcCanvasSize;

    onMounted(() => {
      calcCanvasSize();

      painter = new Painter({ element: "#canvas" });
      painter.paintColor = "#fc7aaf";
    });

    return {};
  },
});
</script>

<style lang="less" scoped>
.main-content {
  position: relative;
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.operator {
  position: relative;
  z-index: 2;
  display: inline-flex;
  flex-direction: column;
  li {
    width: 35px;
    height: 35px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(112, 192, 232, 0.16);
    border-radius: 100px;
    color: rgb(112, 192, 232);
    cursor: pointer;
    &:hover {
      background-color: rgba(112, 192, 232, 0.2);
    }
  }
}
</style>
