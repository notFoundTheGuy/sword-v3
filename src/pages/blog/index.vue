<template>
	<section>
		<div class="main-menu">
			<Suspense>
				<BlogMenu v-model:value="selectKey" />
			</Suspense>
		</div>

		<div class="main-content">
			<div :class="{ animate_fadeout: loading, animate_fadein: !loading }">
				<p class="title">{{ title }}</p>

				<v-md-preview v-if="article" :text="article"></v-md-preview>
				<div v-else>
					Hello :)
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useArticle from './useArticle';
import BlogMenu from './BlogMenu.vue';

export default defineComponent({
	name: 'Blog',
	components: {
		BlogMenu,
	},
	setup(props, context) {
		let selectKey = ref('');

		const { title, article, loading } = useArticle(selectKey);

		return {
			selectKey,
			title,
			article,
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
