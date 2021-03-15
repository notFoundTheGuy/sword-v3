import axios from 'axios';

const instance: any = axios.create({
	baseURL: '//1.15.98.145:9999',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
});


export default instance;
