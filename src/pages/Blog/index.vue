<template>
	<section>
		<div class="main-menu">
			<MenuList :menu="menu" @delete="onDirDel" />

			<AddInput @submit="onDirAdd"></AddInput>
		</div>

		<div class="main-content">
			asd
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuList from '@v/MenuList.vue';
import AddInput from '@c/AddInput.vue';

export default defineComponent({
	name: 'Blog',
	components: { MenuList, AddInput },
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
	methods: {
		onDirAdd(value: any) {
			this.$post(
				'/directory/add',
				this.$qs.stringify({
					name: value,
				})
			).then((res: any) => {
                this.$notify.success({
                    message: '通知',
                    description: '添加成功',
                    duration: 2
                });
				this.getDir();
			});
		},
		onDirDel(item: any) {
			this.$get('/directory/del?id=' + item._id).then((res: any) => {
				this.$notify.success({
                    message: '通知',
                    description: '删除成功',
                    duration: 2
                });
				this.getDir();
			});
		},
		getDir() {
			this.$get('/directory/get').then((res: any) => {
				this.menu = res.data;
			});
		},
	},
	mounted() {
		this.getDir();
	},
});
</script>

<style lang="less" scoped>
.main-menu {
	position: relative;
	> .add-input {
		position: absolute;
		bottom: 0;
		left: 0;
	}
}
</style>
