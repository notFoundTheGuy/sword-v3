<template>
	<div class="md-wrap">
		<div class="header">
			<input type="text" v-model="title" placeholder="请输入标题" />

			<A-Space>
				<A-Select v-model:value="directory" style="width: 200px;" placeholder="请选择目录">
					<A-Select-Option :value="item._id" v-for="(item, index) in menu" :key="index">
						{{ item.name }}
					</A-Select-Option>
				</A-Select>
				<A-Button type="primary" @click="onSave">保存</A-Button>
				<A-Button type="primary" @click="back">返回</A-Button>
			</A-Space>
		</div>

		<v-md-editor v-model="content" height="94vh"></v-md-editor>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Writer',
	data() {
		return {
			title: '',
			content: '',
			directory: null,
			menu: [],
		};
	},
	created() {
		this.getDir();
	},
	methods: {
		onSave() {
            if (!this.directory) {
                alert('目录目录！！！！！')
                return;
            }

            if (!this.title) {
                alert('标题标题！！！！！')
                return;
            }

			this.toSubmit();
		},
		getDir() {
			this.$get('/directory/get').then((res: any) => {
				this.menu = res.data;
			});
		},
		toSubmit() {
			this.$post(
				'/article/add',
				this.$qs.stringify({
					title: this.title,
					content: this.content,
					dir_id: this.directory,
				})
			).then((res: any) => {
				this.$notify.success({
					message: '通知',
					description: '添加成功',
					duration: 2,
				});
                setTimeout(() => {
                    this.$router.push('/blog');
                }, 800);
			});
		},
		back() {
			window.history.back();
		},
	},
});
</script>

<style lang="less" scoped>
.md-wrap {
	position: relative;
    color: #333;
	.header {
		position: relative;
		z-index: 2;
		padding: 0 10px;
		height: 6vh;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: @border-grey;
		input {
			height: 30px;
			line-height: 30px;
			border: none;
			padding: 0 20px 0 10px;
			outline: none;
			font-size: @font-l;
			flex: 1;
		}
	}
}
</style>
