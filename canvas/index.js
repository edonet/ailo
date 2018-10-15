/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-12 09:16:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建画布
 *****************************************
 */
export default class Canvas {

    /* 创建画布 */
    constructor({ width, height } = {}) {
        this.$canvas = document.createElement('canvas');
        this.$context = this.$canvas.getContext('2d');
        this.$canvas.width = width || 1024;
        this.$canvas.height = height || 1024;
    }

    /* 获取宽度 */
    get width() {
        return this.$canvas.width;
    }

    /* 获取高度 */
    get height() {
        return this.$canvas.height;
    }

    /* 获取【URL】 */
    get url() {
        return this.toURL();
    }

    /* 清空画布 */
    clear() {
        this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }

    /* 绘制图片 */
    drawImage(...args) {
        return this.$context.drawImage(...args);
    }

    /* 生成【Url】 */
    toURL(mime, quality) {
        return this.$canvas.toDataURL(mime, quality);
    }

    /* 生成【Url】 */
    toBlob(mime, quality) {
        return new Promise((resolve, reject) => {
            try {
                this.$canvas.toBlob(resolve, mime, quality);
            } catch (error) {
                reject(error);
            }
        });
    }
}
