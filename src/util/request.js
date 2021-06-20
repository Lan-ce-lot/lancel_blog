// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'

var instance = axios.create({
    baseURL: 'http://localhost:8089',
    timeout: 4000,
})





// 请求拦截器
instance.interceptors.request.use(
    function(config) {
        // 发送前
        NProgress.start();
        return config;
    },
    function (error) {
        NProgress.done();
        return Promise.reject(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    function (response) {
        //
        NProgress.done();
        return response;
    },
    function (error) {
        NProgress.done();
        return Promise.reject(error);
    }
)

// token
let setToken = function() {
    instance.defaults.headers.common['token'] = sessionStorage.getItem('token');
}

let get = async function (url, params) {
    let {data} = await instance.get(url, { params });
    return data;
};

let post = async function (url, params) {
    let {data} = await instance.post(url, params);
    return data;
};

export {get, post, setToken}