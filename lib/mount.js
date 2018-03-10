/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-09 17:25:09
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { render, unmountComponentAtNode } from 'react-dom';


/**
 *****************************************
 * 渲染【App】
 *****************************************
 */
export default function mount(app, el) {

    // 获取元素
    if (typeof el === 'string') {
        el = document.getElementById(el);
    }

    // 渲染组件
    return render(app, el);
}


/**
 *****************************************
 * 卸载【App】
 *****************************************
 */
export function unmount(el) {

    // 获取元素
    if (typeof el === 'string') {
        el = document.getElementById(el);
    }

    // 卸载组件
    return unmountComponentAtNode(el);
}
