<template>
	<div class="main-menu">
		<a-menu mode="inline" style="width: 100%" @select="onMenuSelect" :openKeys="openKeys">
			<a-sub-menu v-for="(item, index) in menu" :key="item._id" @titleClick="onSubMenuClick(item)">
				<template #title>
					{{ item.name }}
				</template>

				<a-menu-item v-for="(subItem, subIndex) in item.children" :key="subItem.id">
					{{ subItem.name }}
				</a-menu-item>
			</a-sub-menu>
		</a-menu>
	</div>

	<div class="main-content">
		<div :class="{ animate__fadeOut: loading, animate__fadeIn: !loading }" class="animate__animated">
			<p class="title">{{ title }}</p>

			<v-md-preview v-if="article" :text="article"></v-md-preview>
			<div v-else>
				Hello :)
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRef, toRefs } from 'vue';
import useArticle from './useArticle';
import { fetchDir } from './api/directory';

export default defineComponent({
	name: 'Blog',
	setup(props, context) {
		const state = reactive({
			openKeys: [''],
			curArticleId: '',
			menu: [],
		});

		const { title, article, loading } = useArticle(toRef(state, 'curArticleId'));

		const onMenuSelect = (item: any) => {
			state.curArticleId = item.key;
		};

		const onSubMenuClick = (item: any) => {
			state.openKeys = [item._id];
		};

        // 鼠标hover方式打开
		// const onSubMenuEnter = (item: any) => {
		// 	state.openKeys = [item._id];
		// };

		// const onSubMenuLeave = () => {
		// 	state.openKeys = [];
		// };

		const getDir = async () => {
			state.menu = await fetchDir();
		};

		onMounted(getDir);

		return {
			...toRefs(state),
			title,
			article,
			onMenuSelect,
			onSubMenuClick,
			// onSubMenuEnter,
			// onSubMenuLeave,
			loading,
		};
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
</style>
