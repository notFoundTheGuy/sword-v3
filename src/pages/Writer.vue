<template>
	<div class="md-wrap">
		<div class="header">
			<input type="text" v-model="title" placeholder="请输入标题" />
			<A-Button type="primary" @click="onSave">保存</A-Button>
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
		};
	},
	created() {},
	methods: {
		onSave() {
			this.toSubmit();
		},
		toSubmit() {
			let params = new FormData();
			params.append('title', this.title);
			params.append('content', this.content);
			this.$post('/article/add', params).then(function(response: any) {
				console.log(response);
			});
		},
	},
});
</script>

<style lang="less" scoped>
.md-wrap {
	position: relative;
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
