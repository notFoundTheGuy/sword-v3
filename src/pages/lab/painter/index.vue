<template>
  <section class="lab-painter">
    <h1>画板 🎨</h1>
    <canvas id="canvas"></canvas>
    <ul class="operator">
      <li @click="changePainterType('pen')">
        <Icon name="pen" size="26"></Icon>
      </li>
      <li @click="changePainterType('circle')">
        <Icon name="circle" size="28"></Icon>
      </li>
      <li @click="changePainterType('rect')">
        <Icon name="rect" size="28"></Icon>
      </li>
      <li @click="changePainterType('eraser')">
        <Icon name="eraser" size="28"></Icon>
      </li>
      <!-- <li>
        <Icon name="colors" size="28"></Icon>
      </li> -->
      <li @click="clearAll()">
        <Icon name="clear" size="28"></Icon>
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
    let painter: Painter, canvasEl;

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
      painter.paintSize = 2;
    });

    const changePainterType = (type: string) => {
      switch (type) {
        case "eraser":
          painter.useEraserTool();
          break;

        case "pen":
          painter.usePenTool();
          break;

        case "circle":
          painter.useCircleTool();
          break;

        case "rect":
          painter.useRectTool();
          break;

        default:
          break;
      }
    };

    const clearAll = () => {
      painter.clearAll();
    };

    return {
      changePainterType,
      clearAll,
    };
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
    cursor: url(../../../assets/cursor-pen.png) 16 16, pointer;
    &[data-tool="eraser"] {
      cursor: url(../../../assets/cursor-eraser.png) 16 16, pointer;
    }
  }
}

.lab-painter {
  h1 {
    margin-bottom: 20px
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
      color: #fc7aaf;
    }
  }
}
</style>
