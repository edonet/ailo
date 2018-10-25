/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-12 10:34:12
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import load from './load';
import Canvas from '../canvas';


/**
 *****************************************
 * 缩放图片
 *****************************************
 */
export default async function resize(image, options = {}) {
    let mode = options.mode || 'contain',
        width = options.width || options.size || 1024,
        height = options.height || options.size || 1024,
        compress = options.compress !== false,
        canvas;

    // 加载图片
    if (typeof image === 'string') {
        image = await load(image);
    }

    // 无需缩放
    if (compress && image.width < width && image.height < height) {

        // 调整尺寸
        width = image.width;
        height = image.height;

        // 渲染图片
        canvas = new Canvas({ width, height });
        canvas.drawImage(image, 0, 0, width, height);

        // 返回
        return canvas;
    }

    // 处理包含缩放
    if (mode === 'contain') {
        let rate = Math.min(width / image.width, height / image.height);

        // 调整尺寸
        width = image.width * rate;
        height = image.height * rate;

        // 渲染图片
        canvas = new Canvas({ width, height });
        canvas.drawImage(image, 0, 0, width, height);

        // 返回
        return canvas;
    }

    // 处理覆缩放
    if (mode === 'cover') {
        let rate = Math.min(image.width / width, image.height / height),
            view = [0, 0, width * rate, height * rate];

        view[0] = Math.max(0, (image.width - view[2]) / 2);
        view[1] = Math.max(0, (image.height - view[3]) / 2);

        // 渲染图片
        canvas = new Canvas({ width, height });
        canvas.drawImage(image, ...view, 0, 0, width, height);

        // 返回
        return canvas;
    }

    // 渲染图片
    canvas = new Canvas({ width, height });
    canvas.drawImage(image, 0, 0, width, height);

    // 返回
    return canvas;
}
