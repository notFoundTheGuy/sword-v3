import { fetchArticle } from './api/articles';
import { onMounted, ref, watch, toRefs } from 'vue';

export default function useArticle(id: any) {
	const title = ref(null);
	const article = ref(null);
	const loading = ref(false);

	const getArticleById = async () => {
		if (id.value) {
			loading.value = true;
			let res = await fetchArticle(id.value);
			loading.value = false;
			article.value = res.content;
			title.value = res.title;
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
