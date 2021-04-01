<template>
	<section>
		<div class="main-menu">
			<Suspense>
				<BlogMenu v-model:value="selectKey" />
			</Suspense>
		</div>

		<div class="main-content" ref="mainContent">
			<div :class="{ animate_fadeout: loading, animate_fadein: !loading }">
				<p class="title">{{ title }}</p>

				<v-md-preview v-if="article" :text="article"></v-md-preview>
				<div v-else>
					最近访问
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {  useRouter, useRoute } from 'vue-router';
import useArticle from './useArticle';
import BlogMenu from './BlogMenu.vue';

export default defineComponent({
	name: 'Blog',
	components: {
		BlogMenu,
	},
	setup(props, context) {
        const router = useRouter();
        const route = useRoute();
		let mainContent = ref();
		let selectKey = ref(route.params.id);

		const { title, article, loading } = useArticle(selectKey);

		watch(loading, () => {
			mainContent.value.scrollTo(0, 0);
		});

		watch(selectKey, () => {
            router.push(`/blog/${selectKey.value}`);
		});

		return {
			selectKey,
			title,
			article,
			loading,
			mainContent,
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
