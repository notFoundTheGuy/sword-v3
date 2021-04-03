<template>
	<div class="main-menu">
		<MenuList :menu="menu" @delete="onDirDel" @childClick="onArticleSelect" />

		<AddInput @submit="onDirAdd"></AddInput>
	</div>

	<div class="main-content">
        <a-popconfirm title="Are you sure delete this task?" placement="left" ok-text="Yes" cancel-text="No" @confirm="onArticleDel">
            <Icon name="rubbish" size="18" style="cursor: pointer"></Icon>
        </a-popconfirm>
		
		<p class="title">{{ title }}</p>

		<v-md-preview :text="article"></v-md-preview>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuList from './views/MenuList.vue';
import AddInput from '@c/AddInput.vue';

export default defineComponent({
	name: 'Blog',
	components: { MenuList, AddInput },
	data() {
		return {
			menu: [],
			article: '',
			title: '',
			articleId: '',
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
					duration: 2,
				});
				this.getDir();
			});
		},
		onDirDel(item: any) {
			this.$get('/directory/del?id=' + item._id).then((res: any) => {
				this.$notify.success({
					message: '通知',
					description: '删除成功',
					duration: 2,
				});
				this.getDir();
			});
		},
		onArticleSelect(item: any) {
			this.$get('/article/get?id=' + item.id).then((res: any) => {
				if (res.data) {
					this.articleId = res.data._id;
					this.title = res.data.title;
					this.article = res.data.content;
				}
			});
		},
		onArticleDel() {
			this.$get('/article/del?id=' + this.articleId).then((res: any) => {
				this.title = '';
				this.article = '';
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
		this.article = '# hello';
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

.main-content {
	padding: 10px;
	position: relative;
	.title {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.5;
	}

	.icon-rubbish {
		position: absolute;
		right: 10px;
		top: 10px;
		&:hover {
			color: @color-primary;
		}
	}
}
</style>
