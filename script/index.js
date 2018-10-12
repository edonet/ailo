/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-12 15:20:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 动态加载脚本
 *****************************************
 */
export default function loader(url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');

        // 监听加载状态
        if (script.readyState) {
            script.onerror = reject;
            script.onreadystatechange = () => {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        } else {
            script.onerror = reject;
            script.onload = resolve;
        }

        // 设置属性
        script.type = 'text/javascript';
        script.src = url;

        // 添加文件
        document.body.appendChild(script);
    });
}
