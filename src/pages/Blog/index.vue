<template>
	<section class="blog-wrap">
		<div class="main-menu">
			<MenuList :menu="menu" @delete="onDirDel" @childClick="onArticleSelect" />

			<!-- <AddInput @submit="onDirAdd"></AddInput> -->
		</div>

		<div class="main-content">
			<div :class="{ animate__fadeOut: loading, animate__fadeIn: !loading }" class="animate__animated">
				<!-- <Icon name="rubbish" @click="onArticleDel" size="18" style="cursor: pointer"></Icon> -->
				<p class="title">{{ title }}</p>

				<v-md-preview :text="article"></v-md-preview>
			</div>
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
			menu: [],
			article: '',
			title: '',
			articleId: '',
			loading: false,
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
			this.loading = true;
			this.$get('/article/get?id=' + item.id).then((res: any) => {
				this.loading = false;
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
.blog-wrap {
	position: relative;
	height: 100%;
	display: flex;
	color: @color-text;
	> div {
		background: @color-part;
	}

	.main-menu {
		margin-right: 20px;
		height: 100%;
	}

	.main-content {
		position: relative;
		padding: 10px;
		flex: 1;
		height: 100%;
		overflow: hidden;
        padding-right: 10px + @scrollbar-width;
        &:hover {
            overflow-y: auto;
            padding-right: 10px;
        }

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
				color: @topicColor;
			}
		}
	}
}
</style>
