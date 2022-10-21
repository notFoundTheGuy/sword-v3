<template>
	<section class="lab-lottery">
		<h1>抽奖程序：</h1>
		<NButton strong secondary circle type="success" @click="start">开 始</NButton>

		<div class="wrap">
			<section class="control-board">
				<p>中奖名单</p>
				<ul id="lotteryList"></ul>
			</section>
			<section id="container"></section>
		</div>

		<canvas id="canvas"></canvas>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { NButton, NH1, NText } from 'naive-ui';

const List = [
	'Ezreal',
	'Xayah',
	'Jinx',
	'Aphelios',
	'Yuumi',
	'Nami',
	'Janna',
	'Seraphine',
];
export default defineComponent({
	name: 'Lab',
	components: {
		NButton,
		NH1,
		NText,
	},
	setup(props, context) {
		let interval: any = null;
		let lottery = {
			pointCounter: 1,
			preList: List,
			duration: 5000,
			speed: 200,
			running: false,
		};

		// 绘制图片点阵
		const drawMatrix = (ctx: any, img: any) => {
			console.log(
				'getImageData ==>',
				ctx.getImageData(0, 0, img.width, img.height)
			);
			const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, img.width, img.height);
			// console.log(ctx.getContextAttributes());
			console.log(imgData);

			var gap = 4;

			const container: HTMLElement | null = document.querySelector(
				'#container'
			);

			for (let h = 0; h < img.height; h += gap) {
				for (let w = 0; w < img.width; w += gap) {
					// rgba排序的一维数组，posi表示第h行，第w列
					let posi = img.width * h * 4 + w * 4;
					let r = imgData[posi],
						g = imgData[posi + 1],
						b = imgData[posi + 2];

					if (r + g + b === 0) {
						const metaEl = createMetaEl(
							w,
							h,
							lottery.pointCounter,
							lottery.pointCounter % lottery.preList.length
						);
						lottery.pointCounter++;
						container?.appendChild(metaEl);
					}
				}
			}
		};

		// 在点阵中创建元素
		const createMetaEl = (w: any, h: any, count: any, index: any) => {
			debugger;
			const scale = 1;
			const metaEl = document.createElement('img');
			metaEl.src = `https://game.gtimg.cn/images/lol/act/img/champion/${List[index]}.png`;
			metaEl.setAttribute('class', 'meta-el');
			metaEl.setAttribute('data-count', count);
			metaEl.setAttribute('data-id', index);
			metaEl.style.left = w * scale + 'px';
			metaEl.style.top = h * scale + 'px';
			metaEl.style.width = metaEl.style.height = '7px';
			return metaEl;
		};
		const init = () => {
			const canvasEl: HTMLCanvasElement | any = document.querySelector(
				'#canvas'
			);
			const ctx = canvasEl?.getContext('2d');
			console.dir('==========>');
			console.dir(canvasEl);
			console.dir(ctx);

			const imgSrc = require('./assets/qq-mini.jpg');
			const img = new Image();
			img.src = imgSrc;
			img.onload = () => {
				canvasEl.width = img.width;
				canvasEl.height = img.height;

				ctx.drawImage(img, 0, 0);
				drawMatrix(ctx, img);
			};
		};
		onMounted(init);

		// 抽奖动画 & 结果
		let luckyDom: Object | any = null;
		const findLuckyGuy = (allPoints: any) => {
			luckyDom?.classList.remove('active');

			let luckyOne = parseInt(`${Math.random() * (allPoints - 1) + 1}`, 10);
			luckyDom = document.querySelector(`.meta-el[data-count="${luckyOne}"]`);
			luckyDom.classList.add('active');

			if (!lottery.running) {
				clearInterval(interval);

				// 确定中奖人
				luckyDom?.classList.remove('active');
				luckyDom?.classList.add('final-winner');

				let luckyId = luckyDom.getAttribute('data-id');
				let liDom = document.createElement('li');
				liDom.innerText = lottery.preList[luckyId];
				document.querySelector('#lotteryList')?.append(liDom);
			}
		};

		const start = () => {
			lottery.running = true;
			setTimeout(() => {
				lottery.running = false;
			}, lottery.duration);

			const listLength = lottery.preList.length;
			const allPoints =
				lottery.pointCounter - (lottery.pointCounter % listLength);

			interval = setInterval(() => {
				findLuckyGuy(allPoints);
			}, lottery.speed);
		};

		return {
			start,
		};
	},
});
</script>

<style lang="less">
.lab-lottery {
  h1 {
    margin-bottom: 30px;
  }
  .wrap {
    display: flex;
    .control-board {
      margin-top: 20px;
      > p {
        font-size: 1.2em;
      }
      ul li {
        line-height: 2;
      }
    }
  }
	#canvas {
		display: none;
	}
	#container {
		position: relative;
	}

	#container .meta-el {
		position: absolute;
		/* background: #0455da; */
		display: inline-block;
		transition: all 0.2s;
		color: transparent;
		font-size: 12px;
		/* border-radius: 10px; */
	}

	#container .meta-el:not(.final-winner):hover,
	#container .meta-el.active {
		/* background: red; */
		cursor: pointer;
		transform: scale(5);
		z-index: 2;
	}

	#container .final-winner {
		transform: scale(15);
		z-index: 2;
		transition: all 1s;
		/* border: 0.5px solid gold; */
		box-shadow: 0 0 1px gold;
		border-radius: 100%;
	}
}
</style>
