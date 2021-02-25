import axios from 'axios';

const instance: any = axios.create({
	baseURL: 'http://172.27.12.65:9999',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
});


export default instance;
