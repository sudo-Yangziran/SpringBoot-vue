import axios from 'axios'
import store from '../store/index.js'
const instance = axios.create({
    // 公共配置
    baseURL: "http://127.0.0.1:9191",
    timeout: 5000
})

instance.interceptors.request.use(
    // 在发送请求之前做什么
    config => {
		if(store.state.Authorization=='undefined'){
			config.headers.Authorization=null;
			return config
		}
        if (store.state.Authorization) {
        		console.log(store.state)
        		config.headers.Authorization = `${store.state.Authorization}`;
        		// config['headers']['Authorization'] = AUTH_TOKEN
        	}
        return config
    },
    // 对请求错误做点什么
    error => Promise.reject(error)
)
// instance.interceptors.response.use(
//     // 对响应数据做点什么
//     response => {
//         response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
 
//     },
//     // 对响应错误做点什么
//     error => {
//         const {response}=error;
//         errorHandle(response.status,response.info)
//     }
// )

const errorHandle=(status,info)=>{
    switch(status){
        case 400:
            console.log('别动！');
            break;
        case 401:
            // token
            console.log('别动！');
            break;
        case 403:
            console.log('权限呢宝');
            break;
        case 404:
            console.log('别试了');
            break;
        case 500:
            console.log('别动');
            break;
        case 502:
            console.log('别动');
            break;
        default:
            console.log(info);
            break;
    }
}
export default instance