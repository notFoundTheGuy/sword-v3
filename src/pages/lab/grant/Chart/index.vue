<template>
	<div class="grant-chart" ref="container">
		<svg
			id="grant"
			version="1.1"
			:xlmns="NAME_SPACE"
			:width="boundary?.right"
			:height="boundary?.bottom"
			:style="{
				transform: `translateX(${moveLeft}px)`,
			}"
		>
			<Grid :nodes="data" />
			<Nodes :nodes="data" />
		</svg>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef } from 'vue';
import { NAME_SPACE, mockData } from '../const';
import Grid from './Grid.vue';
import Nodes from './Nodes.vue';
// @ts-ignore
export default defineComponent({
	name: 'grant',
	components: { Grid, Nodes },
	props: {
		boundary: Object,
		startPercent: Number,
	},
	setup(props) {
		let { boundary, startPercent } = props;
		// 使用toRef给props添加响应式
		let startPercentRef = toRef(props, 'startPercent');

		let container = ref();

		let moveLeft = computed(() => {
			if (!container.value || !startPercentRef.value || !boundary) {
				return 0;
			}
			return -(
				startPercentRef.value *
				(boundary.right - container.value.offsetWidth)
			);
		});

		return {
			NAME_SPACE,
			data: mockData,
			boundary,
			container,
			moveLeft,
			startPercent,
		};
	},
});
</script>

<style lang="less" scoped>
.grant-chart {
	overflow: hidden;
}
</style>
