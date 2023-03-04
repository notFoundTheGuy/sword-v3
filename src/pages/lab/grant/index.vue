<template>
	<section class="lab-grant">
		<h1 style="margin-bottom: 20px">7月需求进度跟踪表</h1>
		<div class="grant-wrap">
			<div>
				<Chart :boundary="boundary" :startPercent="startPercent" />
				<div class="data-zoom-wrap">
					<DataZoom :boundary="boundary" @change="onZoomChange" />
				</div>
			</div>
			<Axis :nodes="data" />
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { clacBoundary } from './utils';
import { NAME_SPACE, mockData } from './const';
import DataZoom from './DataZoom/index.vue';
import Chart from './Chart/index.vue';
import Axis from './Axis/index.vue';
// @ts-ignore
export default defineComponent({
	name: 'grant',
	components: { DataZoom, Chart, Axis },
	setup() {
		let startPercent = ref(0);
		const onZoomChange = (start: number) => {
			startPercent.value = start;
			console.log(startPercent);
		};

		return {
			NAME_SPACE,
			data: mockData,
			boundary: clacBoundary(mockData),
			onZoomChange,
			startPercent,
		};
	},
});
</script>

<style lang="less" scoped>
.grant-wrap {
	position: relative;
	width: 100%;
	overflow: auto;
	padding-left: 100px;
	padding-right: 100px;
	.data-zoom-wrap {
		margin-top: 20px;
	}
}
</style>
