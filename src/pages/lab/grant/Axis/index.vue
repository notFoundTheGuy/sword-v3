<template>
	<!-- 临时纵轴 -->
	<ul class="axis-y">
		<li
			v-for="(item, index) in nodes"
			:key="index"
			:style="{ height: ROW_HEIGHT + 'px' }"
		>
			{{ item.name }}
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ROW_HEIGHT } from '../const';

export default defineComponent({
	name: 'axis',
	props: {
		nodes: Array,
	},
	setup(props, context) {
		let { nodes } = props;

		return {
			nodes,
			ROW_HEIGHT,
		};
	},
});
</script>

<style lang="less" scoped>
.axis-y {
	position: absolute;
	top: 0;
	left: 0;
  li {
    display: flex;
    align-items: center;
  }
}
</style>
