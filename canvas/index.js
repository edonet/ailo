/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-12 09:16:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { createBlobFromBaseURL } from '../file';


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
        return this;
    }

    /* 填充画布 */
    fill(color) {
        let rest = this.$context.fillStyle;

        this.$context.fillStyle = color || rest;
        this.$context.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.$context.fillStyle = rest;
        return this;
    }

    /* 绘制图片 */
    drawImage(image, ...args) {
        let width = image.width,
            height = image.height;

        // 切片渲染
        if (args.length === 8) {
            let [sx, sy, sw, sh, x, y, w, h] = args,
                nx = Math.ceil(sw / 980),
                ny = Math.ceil(sh / 980);

            // 获取分片尺寸
            sw = Math.round(sw / nx);
            sh = Math.round(sh / ny);
            w = Math.round(w / nx);
            h = Math.round(h / ny);

            // 分片渲染
            for(let i = 0; i < nx; i ++) {
                for(let j = 0; j < ny; j ++) {
                    this.$context.drawImage(
                        image, sx + i * sw, sy + j * sh, sw, sh, x + i * w, y + j * h, w + 1, h + 1
                    );
                }
            }

            // 返回
            return this;
        }

        // 重新函数
        switch (args.length) {
            case 4:
                this.drawImage(image, 0, 0, width, height, ...args);
                break;
            case 2:
                this.drawImage(image, 0, 0, width, height, ...args, width, height);
                break;
            case 0:
                this.drawImage(image, 0, 0, width, height, 0, 0, width, height);
                break;
            default:
                this.$context.drawImage(image, ...args);
        }

        // 返回
        return this;
    }

    /* 生成【Url】 */
    toURL(mime, quality) {
        return this.$canvas.toDataURL(mime, quality);
    }

    /* 生成【Url】 */
    toBlob(mime, quality) {
        return new Promise((resolve, reject) => {
            try {

                // 自带【Canvas】方法
                if (this.$canvas.toBlob) {
                    return this.$canvas.toBlob(resolve, mime, quality);
                }

                // 兼容方法
                resolve(createBlobFromBaseURL(this.toURL()));
            } catch (error) {
                reject(error);
            }
        });
    }
}
