<template>
	<div class="data-zoom" ref="container">
		<div
			ref="slider"
			class="slider"
			@mousedown="onMouseDown"
			:style="{ left: moveDistance + 'px' }"
		></div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	ref,
	onMounted,
	onUnmounted,
	computed,
	watch,
} from 'vue';

export default defineComponent({
	name: 'datazoom',
	props: {
		boundary: Object,
	},
	setup(props, context) {
		let moveDistance = ref(0);
		let isDragging = ref(false);
		let moveStart = ref<null | number>(null);
		let container = ref();
		let slider = ref();

		let startPercent = computed(() => {
			return moveDistance.value
				? Number((
						(moveDistance.value + slider.value.offsetWidth) /
						container.value.offsetWidth
				  ).toFixed(4))
				: 0;
		});

		watch(startPercent, () => {
			context.emit('change', startPercent.value);
		});

		const onMouseDown = (e: MouseEvent) => {
			isDragging.value = true;
			document.body.style.cursor = 'ew-resize';
			document.body.style.userSelect = 'none';
		};
		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging.value) return;
			if (!moveStart.value) {
				moveStart.value = e.clientX;
			}
			// 左边界
			moveDistance.value = e.clientX - moveStart.value;
			if (moveDistance.value <= 0) {
				console.log('=====', moveDistance.value);
				moveDistance.value = 0;
			}
			// 右边界
			const maxDistance =
				container.value.offsetWidth - slider.value.offsetWidth;
			if (moveDistance.value > maxDistance) {
				moveDistance.value = maxDistance;
			}
		};

		const onMouseUp = () => {
			if (!isDragging.value) return;
			document.body.style.cursor = 'auto';
			document.body.style.userSelect = 'initial';
			isDragging.value = false;
		};

		onMounted(() => {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});

		onUnmounted(() => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		});

		return {
			moveDistance,
			onMouseDown,
			container,
			slider,
		};
	},
});
</script>

<style lang="less" scoped>
.data-zoom {
	background: rgb(96, 96, 96);
	height: 30px;
	position: relative;
	.slider {
		background: #ffffff50;
		cursor: ew-resize;
		width: 80px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>
