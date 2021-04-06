import { fetchArticle } from './api/articles';
import { onMounted, ref, watch, nextTick } from 'vue';

export default function useArticle(id: any) {
	const title = ref('');
	const article = ref('');
	const loading = ref(false);

	const getArticleById = async () => {
        loading.value = true;
		if (id.value) {
			let res = await fetchArticle(id.value);
			loading.value = false;
			article.value = res.content;
			title.value = res.title;
		} else {
			nextTick(() => {
				loading.value = false;
			});
			article.value = title.value ='';
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
