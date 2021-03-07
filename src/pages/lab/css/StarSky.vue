<template>
	<div class="star-sky">
		<div class="stars" ref="starsRef">
			<div class="star" v-for="(item, index) in count"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	name: 'StarSky',
	setup() {
		let starsRef = ref(null);

		let count = 900;
		let distance = 800;

		onMounted(() => {
			// @ts-ignore
			let starNodes = Array.from(starsRef.value.children);
			starNodes.forEach((item: any) => {
				let speed = 0.2 + Math.random() * 1;
				let thisDistance = distance + Math.random() * 300;
				item.style.transformOrigin = `0 0 ${thisDistance}px`;
				item.style.transform = `
                translate3d(0, 0, -${thisDistance}px)
                rotateY(${Math.random() * 360}deg)
                rotateX(${Math.random() * -50}deg)
                scale(${speed}, ${speed})
                `;
			});
		});
		return {
			starsRef,
			count,
		};
	},
});
</script>

<style lang="less" scoped>
.star-sky {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	background: radial-gradient(200% 105% at top center, #1b2947 10%, #232e50 40%, #614e7b 70%);
	// background: radial-gradient(200% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6);
	background-attachment: fixed;
	overflow: hidden;
    animation: fadeIn 1s linear forwards;
}
@keyframes rotate {
	0% {
		transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
	}
	100% {
		transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.stars {
	position: absolute;
	left: 50%;
	bottom: 0;
	transform: perspective(500px);
	transform-style: preserve-3d;
	perspective-origin: 50% 100%;
	animation: rotate 90s infinite linear;

	.star {
		width: 2px;
		height: 2px;
		background: #f7f7b6;
		position: absolute;
		left: 0;
		top: 0;
		backface-visibility: hidden;
	}
}
</style>
