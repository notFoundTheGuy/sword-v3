<template>
	<svg class="sword-icon" :class="[klass, iconName]" :style="_style">
		<use :xlink:href="'#' + iconName"></use>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Icon',
	props: {
		name: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		size: {
			type: [String, Number],
			default: 24,
		},
		customStyle: {
			type: Object,
			default: () => ({}),
		},
		klass: {
			type: String,
			default: '',
		},
	},
	computed: {
		_style(): any {
			return {
				fontSize: this.size + 'px',
				...this.customStyle,
			};
		},
		iconName(): any {
			return `icon-${this.name}`;
		},
		// data-title 为空时会意外触发tooltip，这里利用动态参数hack下
		titleName(): any {
			return this.title ? 'data-title' : null;
		},
	}
});
</script>

<style lang="less" scoped>
// 防止外层使用svg symbol时覆盖
svg.sword-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.font-icon {
	width: 1em;
	height: 1em;
}
</style>
