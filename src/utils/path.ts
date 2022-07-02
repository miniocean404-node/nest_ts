import path, { normalize } from 'path'

export const resolve = path.resolve
export const rootPath = process.cwd()

// 根目录下
export const srcPath = normalize(`${rootPath}/src`)
export const publicPath = normalize(`${rootPath}/public`)

// src 目录下
export const viewsPath = normalize(`${srcPath}/views`)
export const templatesPath = normalize(`${srcPath}/views/templates`)
