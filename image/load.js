/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-12 09:07:26
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载图片
 *****************************************
 */
export default function load(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();

        // 监听加载状态
        image.onload = () => resolve(image);
        image.onerror = err => reject(err);

        // 加载图片
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });
}
