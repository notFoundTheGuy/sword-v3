<template>
	<div>
		<MenuTree :menu="menu" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuTree from '_c/MenuTree.vue';

export default defineComponent({
    name: 'Blog',
    components: { MenuTree },
	data() {
		return {
			menu: [
				{
					name: '目录1',
					id: 1,
				},
				{
					name: '目录2',
					id: 2,
					children: [
						{
							name: '目录2-1',
							id: 22,
						},
						{
							name: '目录2-2',
							id: 23,
						},
					],
				},
				{
					name: '目录3',
					id: 3,
				},
			],
		};
	},
});
</script>

<style lang="less" scoped>

</style>
