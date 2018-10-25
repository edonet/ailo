/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-13 20:26:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义自定义事件
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
 * 派发事件
 *****************************************
 */
export function createCustomEvent(type, detail = null) {
    return new CustomEvent(type, { bubbles: true, cancelable: true, detail });
}
