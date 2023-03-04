<template>
	<g strokeWidth="1" stroke="#ffffff50">
		<line
			stroke-dasharray="5, 2"
			v-for="(item, index) in hLines"
			:key="index"
			:x1="item.left"
			:y1="item.top"
			:x2="item.right"
			:y2="item.bottom"
		>
		</line>
		<line
			stroke-dasharray="5, 2"
			v-for="(item, index) in vLines"
			:key="index"
			:x1="item.left"
			:y1="item.top"
			:x2="item.right"
			:y2="item.bottom"
		>
		</line>
	</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { clacBoundary } from '../utils';
import { ROW_HEIGHT, COLUMN_WIDTH } from '../const';

// @ts-ignore
export default defineComponent({
	name: 'grant',
	props: {
		nodes: Array,
	},
	setup(props, context) {
		const { nodes } = props;

		// 计算出所有的横轴
		function calcHorizontalLines(rowHeight: any, boundary: any) {
			let lines = [];
			const count = (boundary.bottom - boundary.top) / rowHeight;
			for (let i = 0; i < count + 1; i++) {
				lines.push({
					top: i * rowHeight,
					left: 0,
					right: boundary.right,
					bottom: i * rowHeight,
				});
			}

			return lines;
		}

		// 计算出所有的纵轴
		function calcVerticalLines(columnWidth: any, boundary: any) {
			let lines = [];
			const count = (boundary.right - boundary.left) / columnWidth;
			for (let i = 0; i < count + 1; i++) {
				lines.push({
					top: 0,
					left: i * columnWidth,
					right: i * columnWidth,
					bottom: boundary.bottom,
				});
			}

			return lines;
		}

		const boundary = clacBoundary(nodes);
		const hLines = calcHorizontalLines(ROW_HEIGHT, boundary);
		const vLines = calcVerticalLines(COLUMN_WIDTH, boundary);

		return {
			hLines,
			vLines,
		};
	},
});
</script>

<style lang="less" scoped></style>
