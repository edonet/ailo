/**
 *****************************************
 * Created by lifx
 * Created on 2018-09-25 18:54:54
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import axios from 'axios';
import qs from 'qs';


/**
 *****************************************
 * 创建请求实例
 *****************************************
 */
const axiosInstance = axios.create({
    timeout: 30000,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
    }
});


/**
 *****************************************
 * 拦截请求
 *****************************************
 */
axiosInstance.interceptors.request.use(
    config => {
        let type = config.method.toLowerCase();

        // 序列化参数
        switch (type) {
            case 'get':
            case 'put':
            case 'delete':
                config.data = qs.stringify(config.data);
                break;
            case 'post':
                if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
                    config.data = qs.stringify(config.data);
                }
                break;
            default:
                break;
        }

        // 返回配置
        return config;
    },
    err => {
        return Promise.reject(err.data.error.message);
    }
);


/**
 *****************************************
 * 拦截返回
 *****************************************
 */
axiosInstance.interceptors.response.use(res => {
    let data = res.data;

    // 拦截错误返回
    if (data.code !== 0) {
        throw new Error(data.message || '服务器忙，请稍后再试');
    }

    // 返回数据
    return res.data;
});


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default axiosInstance;
export { axios, qs };
