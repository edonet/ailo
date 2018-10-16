/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-13 20:26:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 判断是否支持【passive】
 *****************************************
 */
const passiveSupported = (() => {
    let support = false;

    // 测试是否支持
    try {
        window.addEventListener('test', null, {
            get passive() {
                return support = true;
            }
        });
    } catch (error) {
        // do nothing;
    }

    // 返回结果
    return support;
})();



/**
 *****************************************
 * 创建事件对象
 *****************************************
 */
export function createEvent(data = null) {
    let isDefaultPrevented = false;

    // 返回对象
    return Object.create(data, {
        defaultPrevented: {
            get() {
                return isDefaultPrevented;
            }
        },
        preventDefault: {
            value: () => {
                isDefaultPrevented = true;
            }
        }
    });
}


/**
 *****************************************
 * 创建事件对象
 *****************************************
 */
export function createEventOptions(options = false) {

    // 处理参数
    if (typeof options === 'boolean') {
        options = { capture: options };
    }

    // 返回对象
    return passiveSupported ? options : options.capture;
}


/**
 *****************************************
 * 添加事件
 *****************************************
 */
export function addEvent(el, type, callback, options) {

    // 添加事件
    el.addEventListener(type, callback, createEventOptions(options));

    // 返回移除函数
    return () => removeEvent(el, type, callback, options);
}


/**
 *****************************************
 * 移除事件
 *****************************************
 */
export function removeEvent(el, type, callback, options) {
    el.removeEventListener(type, callback, createEventOptions(options));
}
