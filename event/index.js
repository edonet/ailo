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
 * 兼容定义自定义事件
 *****************************************
 */
if (!window.CustomEvent) {
    window.CustomEvent = function CustomEvent (type, options) {
        let event;

        // 合并选项
        options = options || { bubbles: false, cancelable: false, detail: undefined };

        // 创建事件
        try {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, options.bubbles, options.cancelable, options.detail);
        } catch (error) {
            event = document.createEvent('Event');
            event.initEvent(type, options.bubbles, options.cancelable);
            event.detail = options.detail;
        }

        // 返回结果
        return event;
    };
}


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
 * 创建自定义事件
 *****************************************
 */
export function createCustomEvent(type, detail = null) {
    return new CustomEvent(type, { bubbles: true, cancelable: true, detail });
}


/**
 *****************************************
 * 创建事件配置
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


/**
 *****************************************
 * 派发事件
 *****************************************
 */
export function dispatchEvent(el, type, detail) {
    return el.dispatchEvent(createCustomEvent(type, detail));
}
