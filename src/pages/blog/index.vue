<template>
	<div class="main-menu">
		<a-menu
			mode="inline"
			style="width: 100%"
			@select="onSelect"
		>
			<a-sub-menu v-for="(item, index) in menu" :key="item._id">
				<template #title>
					{{ item.name }}
				</template>

				<a-menu-item v-for="(subItem, subIndex) in item.children" :key="subItem.id">
					{{ subItem.name }}
				</a-menu-item>
			</a-sub-menu>
		</a-menu>

		<!-- <MenuList :menu="menu" @delete="onDirDel" @childClick="onArticleSelect" /> -->

		<!-- <AddInput @submit="onDirAdd"></AddInput> -->
	</div>

	<div class="main-content">
		<div :class="{ animate__fadeOut: loading, animate__fadeIn: !loading }" class="animate__animated">
			<!-- <Icon name="rubbish" @click="onArticleDel" size="18" style="cursor: pointer"></Icon> -->
			<p class="title">{{ title }}</p>

			<v-md-preview :text="article"></v-md-preview>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import AddInput from '@c/AddInput.vue';

export default defineComponent({
	name: 'Blog',
	components: { AddInput },
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
        onSelect(item: any) {
            this.getArticleById(item.key);
        },
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
        getArticleById(id: string) {
            this.$get('/article/get?id=' + id).then((res: any) => {
				this.loading = false;
				if (res.data) {
					this.articleId = res.data._id;
					this.title = res.data.title;
					this.article = res.data.content;
				}
			});
        },
		// onArticleSelect(item: any) {
		// 	this.loading = true;
		// 	this.$get('/article/get?id=' + item.id).then((res: any) => {
		// 		this.loading = false;
		// 		if (res.data) {
		// 			this.articleId = res.data._id;
		// 			this.title = res.data.title;
		// 			this.article = res.data.content;
		// 		}
		// 	});
		// },
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
.title {
	font-size: 2.5rem;
	font-weight: 700;
	line-height: 1.5;
    color: @color-text;
}

.icon-rubbish {
	position: absolute;
	right: 10px;
	top: 10px;
	&:hover {
		color: @topicColor;
	}
}
</style>
