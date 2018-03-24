/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-27 14:15:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    path = require('path'),
    dir = (...args) => path.resolve(__dirname, ...args),
    resolve = require.resolve;


/**
 *****************************************
 * 输出配置
 *****************************************
 */
module.exports = {
    rootDir: dir('../'),
    roots: [
        '<rootDir>/test/'
    ],
    testMatch: [
        '**/?(*.)(spec|test).js'
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    moduleNameMapper: {
        '^ailo/(.*)$': '<rootDir>/lib/$1'
    },
    transform: {
        '^.+\\.(js|jsx)$': resolve('./jsTransform.js'),
        '^.+\\.(scss|css)$': resolve('./cssTransform.js'),
        '^(?!.*\\.(js|jsx|css|json)$)': resolve('./fileTransform.js')
    },
    transformIgnorePatterns: [
        'node_modules', 'git'
    ],
    collectCoverageFrom: [
        '**/*.{js,jsx}'
    ]
};
