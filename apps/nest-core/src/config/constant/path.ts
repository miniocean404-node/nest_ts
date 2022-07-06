import path, { normalize } from 'path'

export const resolve = path.resolve
export const rootPath = process.cwd()

// 根目录下
export const publicPath = normalize(`${rootPath}/public`)
export const clientPath = normalize(`${rootPath}/client`)

// src 目录下
export const srcPath = normalize(`${rootPath}/apps/nest-core/src`)
export const viewsPath = normalize(`${srcPath}/views`)
export const templatesPath = normalize(`${srcPath}/views/templates`)
