import axios from '@/common/axios'
import qs from 'qs';

export const fetchDir = function () {
    return axios.get('/directory/get').then((res: any) => {
        return res.data;
    });
}

export const addDir = function(name: string) {
    return axios.post('/directory/add', qs.stringify({name: name})).then((res: any) => {
        return res.data;
    })
}

export const delDir = function(id: string) {
    return axios.get('/directory/add?id=' + id).then((res: any) => {
        return res.data;
    })
}