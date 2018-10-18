/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-12 09:53:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 文件处理
 *****************************************
 */
export default class File {

    /* 初始化数据 */
    constructor(file) {
        this.$file = file;
    }


    /* 获取内容 */
    read(encoding) {

        // 从缓存中获取
        if (this.$content) {
            return Promise.resolve(this.$content);
        }

        // 读取文件
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            // 添加监听
            reader.onload = e => resolve(this.$content = e.target.result);
            reader.onerror = reject;

            // 读取文件
            reader.readAsDataURL(this.$file, encoding);
        });
    }

    /* 生成【url】 */
    toURL() {

        // 从缓存中获取
        if (this.$url) {
            return Promise.resolve(this.$url);
        }

        // 读取文件
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            // 添加监听
            reader.onload = e => resolve(this.$url = e.target.result);
            reader.onerror = reject;

            // 读取文件
            reader.readAsDataURL(this.$file);
        });
    }
}


/**
 *****************************************
 * 生成文件【url】
 *****************************************
 */
export function readFileToURL(file) {
    return typeof file === 'string' ? Promise.resolve(file) : (new File(file)).toURL();
}


/**
 *****************************************
 * 从【Base64】生成【Blob】
 *****************************************
 */
export function createBlobFromBaseURL(baseURL) {
    let [type, data] = baseURL.split(','),
        Builder = window.WebKitBlobBuilder || window.MozBlobBuilder,
        Blob = window.Blob || window.WebKitBlob,
        buffer,
        arr;


    // 格式化数据
    type = type.slice(5, -7);
    data = window.atob(data);

    // 创建【Buffer】
    buffer = new ArrayBuffer(data.length);
    arr = new Uint8Array(buffer);

    // 填充数据
    for (let i = 0, len = data.length; i < len; i ++) {
        arr[i] = data.charCodeAt(i);
    }

    // 创建【Blob】
    if (Blob) {
        return new Blob([buffer], { type });
    }

    // 兼容私有方法
    if (Builder) {
        let builder = new Builder();

        // 生成【Blob】
        builder.append(buffer);
        return builder.getBlob(type);
    }
}
