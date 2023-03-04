<template>
	<g strokeWidth="1" stroke="#ffffff50">
		<template v-for="(item, index) in nodesPosi" :key="index">
			<rect
				:x="item.left"
				:y="item.top"
				:width="item.right - item.left"
				:height="item.bottom - item.top"
				:fill="COLORS[parseInt(Math.random() * COLORS.length + '', 10)]"
			/>
			<text :x="item.left + 10" :y="item.top + ROW_HEIGHT / 2 + 5" fill="#000"
				>{{ item?.name }}： 🕟{{ item?.task }} ({{
					item.start.toString().slice(4)
				}}
				- {{ item.end.toString().slice(4) }})</text
			>
		</template>
	</g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { clacBoundary, getDateFromDateStr } from '../utils';
import { ROW_HEIGHT, COLUMN_WIDTH, ONE_DAY_TIME, COLORS } from '../const';

// @ts-ignore

export default defineComponent({
	name: 'grant',
	props: {
		nodes: Array,
	},
	setup(props, context) {
		const { nodes } = props;
		const { startTime } = clacBoundary(nodes);

		// 计算出所有点的坐标
		function calcNodesPosition() {
			let rectList: {
				[x: string]: any;
				top: number;
				left: number;
				right: number;
				bottom: number;
			}[] = [];
			nodes?.forEach((item: any, idx) => {
				rectList.push({
					...item,
					top: idx * ROW_HEIGHT,
					left:
						((getDateFromDateStr(item?.start).time - startTime) /
							ONE_DAY_TIME) *
						COLUMN_WIDTH,
					right:
						((getDateFromDateStr(item?.end).time - startTime) / ONE_DAY_TIME) *
						COLUMN_WIDTH,
					bottom: (idx + 1) * ROW_HEIGHT,
				});
			});

			return rectList;
		}

		const nodesPosi = calcNodesPosition();
		return {
			nodesPosi,
			COLORS,
			ROW_HEIGHT,
		};
	},
});
</script>

<style lang="less" scoped></style>
