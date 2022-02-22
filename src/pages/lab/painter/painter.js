/** @type {HTMLCanvasElement} */

export default class Painter {
  data = [];
  canvas = null;
  ctx = null;
  curTool = "pen";
  #isPainting = false;

  constructor({ element }) {
    this.canvas = document.querySelector(element);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
    this.usePenTool();
  }

  static calcRelativePosition = (e, canvas) => {
    return {
      // x: e.pageX - canvas.offsetLeft,
      // y: e.pageY - canvas.offsetTop,
      x: e.layerX,
      y: e.layerY,
    };
  };

  get getPaintState() {
    return this.#isPainting;
  }

  get paintColor() {
    return this.ctx.strokeStyle || this.ctx.fillStyle;
  }

  set paintColor(color) {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
  }

  set paintSize(size) {
    this.ctx.lineWidth = size;
  }

  // 画笔工具
  usePenTool() {
    this.curTool = "pen";
    this.canvas.setAttribute("data-tool", "pen");
    this.#usePath();
  }

  // 橡皮擦工具
  useEraserTool() {
    this.curTool = "eraser";
    this.canvas.setAttribute("data-tool", "eraser");
    this.#usePath();
  }

  // 画笔｜橡皮擦 通用
  #usePath() {
    this.canvas.onmousedown = (e) => {
      this.#isPainting = true;
      let points = [];
      let lastPoint = Painter.calcRelativePosition(e, this.canvas);

      this.canvas.onmousemove = (e) => {
        let nextPoint = Painter.calcRelativePosition(e, this.canvas);
        switch (this.curTool) {
          case "pen":
            this.drawLine(lastPoint, nextPoint);
            break;
          case "eraser":
            this.drawEraser(lastPoint, nextPoint);
            break;

          default:
            break;
        }

        points.push(nextPoint);
        lastPoint = nextPoint;
      };

      this.canvas.onmouseup = this.canvas.onmouseout = () => {
        if (this.#isPainting) {
          this.canvas.onmousemove = null;
          this.data.push({
            type: this.curTool,
            points,
            color: this.ctx.strokeStyle,
          });
          this.#isPainting = false;
          console.log(this.data);
        }
      };
    };
  }

  // 圆形工具
  useCircleTool() {
    this.curTool = "circle";
    this.canvas.setAttribute("data-tool", "circle");
    this.canvas.onmousedown = (e) => {
      this.#isPainting = true;
      let { x: startX, y: startY } = Painter.calcRelativePosition(
        e,
        this.canvas
      );
      let endX, endY;

      this.canvas.onmousemove = (e) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();

        ({ x: endX, y: endY } = Painter.calcRelativePosition(e, this.canvas));
        this.drawCircle(startX, startY, endX, endY);
      };

      this.canvas.onmouseup = this.canvas.onmouseout = () => {
        if (this.#isPainting) {
          this.canvas.onmousemove = null;
          this.data.push({
            type: this.curTool,
            startX,
            startY,
            endX,
            endY,
            color: this.ctx.strokeStyle,
          });
          this.#isPainting = false;
        }
      };
    };
  }

  // 矩形工具
  useRectTool() {
    this.curTool = "rect";
    this.canvas.setAttribute("data-tool", "rect");
    this.canvas.onmousedown = (e) => {
      this.#isPainting = true;
      let { x: startX, y: startY } = Painter.calcRelativePosition(
        e,
        this.canvas
      );
      let endX, endY;

      this.canvas.onmousemove = (e) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();

        ({ x: endX, y: endY } = Painter.calcRelativePosition(e, this.canvas));
        this.drawRect(startX, startY, endX, endY);
      };

      this.canvas.onmouseup = this.canvas.onmouseout = () => {
        if (this.#isPainting) {
          this.canvas.onmousemove = null;
          this.data.push({
            type: this.curTool,
            startX,
            startY,
            endX,
            endY,
            color: this.ctx.strokeStyle,
          });
          this.#isPainting = false;
        }
      };
    };
  }

  drawLine = (point1, point2, options = {}) => {
    const { strokeStyle } = options;
    this.ctx.save();
    strokeStyle && (this.ctx.strokeStyle = strokeStyle);

    this.ctx.beginPath();
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
    this.ctx.stroke();
    this.ctx.restore();
  };

  drawEraser = (point1, point2) => {
    this.ctx.save();
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.lineWidth = 15;
    this.drawLine(point1, point2);
    this.ctx.restore();
  };

  drawCircle = (startX, startY, endX, endY, options = {}) => {
    const { strokeStyle } = options;
    this.ctx.save();
    strokeStyle && (this.ctx.strokeStyle = strokeStyle);

    let radius = Math.sqrt(
      Math.pow(Math.abs(endX - startX), 2) +
        Math.pow(Math.abs(endY - startY), 2)
    );
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  };

  drawRect = (startX, startY, endX, endY, options = {}) => {
    const { strokeStyle } = options;
    this.ctx.save();
    strokeStyle && (this.ctx.strokeStyle = strokeStyle);

    this.ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    this.ctx.restore();
  };

  clearAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.data = [];
  }

  // line是直接画，其他图形需要预览，需要清画布后render历史图形
  render() {
    this.data.forEach((ele) => {
      switch (ele.type) {
        case "pen":
        case "eraser":
          ele.points.reduce((prePoint, nexPoint) => {
            ele.type === "pen"
              ? this.drawLine(prePoint, nexPoint, { strokeStyle: ele.color })
              : this.drawEraser(prePoint, nexPoint);
            return nexPoint;
          });
          break;

        case "circle":
          this.drawCircle(ele.startX, ele.startY, ele.endX, ele.endY, {
            strokeStyle: ele.color,
          });
          break;

        case "rect":
          this.drawRect(ele.startX, ele.startY, ele.endX, ele.endY, {
            strokeStyle: ele.color,
          });
          break;

        default:
          break;
      }
    });
  }
}
