import path, { normalize } from 'path'

export const resolve = path.resolve
export const ROOT_PATH = process.cwd()

// 根目录下
export const PBULIC_PATH = normalize(`${ROOT_PATH}/public`)
export const CLIENT_PATH = normalize(`${ROOT_PATH}/client`)

// src 目录下
export const SRC_PATH = normalize(`${ROOT_PATH}/apps/nest-core/src`)
export const VIEW_PATH = normalize(`${SRC_PATH}/views`)
export const TEMPLATES_PATH = normalize(`${SRC_PATH}/views/templates`)
