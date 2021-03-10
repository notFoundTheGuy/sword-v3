import axios from '@/common/axios';

export const fetchArticle = function(id: string) {
	return axios.get('/article/get?id=' + id).then((res: any) => {
		return res.data;
	});
};

export const delArticle = function(id: string) {
	return axios.get('/article/del?id=' + id).then((res: any) => {
		return res.data;
	});
};
