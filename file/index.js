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
