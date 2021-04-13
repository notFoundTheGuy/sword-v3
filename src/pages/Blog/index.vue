<template>
	<section>
		<div class="main-menu">
			<Suspense>
                <template #default>
                    <BlogMenu v-model:value="selectKey" />
                </template>
				
                <template #fallback>
                    <LoadingStairs />
                </template>
			</Suspense>
		</div>

		<div class="main-content" ref="mainContent">
			<div :class="{ animate_fadeout: loading, animate_fadein: !loading }" v-if="!loading">
				<p class="title">{{ title }}</p>

				<v-md-preview v-if="article" :text="article"></v-md-preview>
				<div v-else>
					<BlogHome @turnTo="articleChange" />
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useArticle from './useArticle';
import BlogMenu from './views/BlogMenu.vue';
import BlogHome from './views/BlogHome.vue';
import LoadingStairs from '@/pages/lab/css/loading/Stairs.vue';

export default defineComponent({
	name: 'Blog',
	components: {
		BlogMenu,
		BlogHome,
        LoadingStairs
	},
	setup(props, context) {
		const router = useRouter();
		const route = useRoute();
		let mainContent = ref();
		let selectKey = ref(route.params.id);

		const { title, article, loading } = useArticle(selectKey);

		let articleChange = (id: any) => {
			id ? (selectKey.value = id) : null;
		};

		watch(loading, () => {
			mainContent.value.scrollTo(0, 0);
		});

		watch(selectKey, () => {
			router.push(`/blog/${selectKey.value}`);
		});

		// 回到首页
		watch(
			() => route.path,
			(path) => {
				if (path.indexOf('blog') !== -1 && !route.params.id) {
					selectKey.value = '';
				}
			}
		);

		return {
			selectKey,
			title,
			article,
			loading,
			mainContent,
			articleChange,
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
.main-menu {
    .loader-stairs {
        margin: 160px auto 0;
    }
}
</style>
