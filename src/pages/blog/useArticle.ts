import { fetchArticle } from './api/articles';
import { onMounted, ref, watch, nextTick } from 'vue';

export default function useArticle(id: any) {
	const title = ref('');
	const article = ref('');
	const loading = ref(false);

	const getArticleById = async () => {
		if (id.value) {
			loading.value = true;
			let res = await fetchArticle(id.value);
			loading.value = false;
			article.value = res.content;
			title.value = res.title;
		} else {
			loading.value = true;
			nextTick(() => {
				loading.value = false;
			});
			article.value = '';
			title.value = '';
		}
	};

	onMounted(getArticleById);

	watch(id, getArticleById);

	return {
		title,
		article,
		loading,
	};
}
