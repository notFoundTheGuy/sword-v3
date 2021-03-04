import axios from 'axios';

const instance: any = axios.create({
	baseURL: '//www.lijian.run:9999',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
});


export default instance;
