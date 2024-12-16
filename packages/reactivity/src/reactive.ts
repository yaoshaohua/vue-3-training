import { isObject } from "@vue/shared"
import { ReactiveFlags, mutableHandler } from "./baseHandler"

const proxyMap = new WeakMap()

function createReactive(target: any) {
  if (!isObject(target)) return

  if (target[ReactiveFlags.IS_REACTIVE]) return target

  const existProxy = proxyMap.get(target)
  if (existProxy) return existProxy

  const proxyTarget = new Proxy(target, mutableHandler)
  proxyMap.set(target, proxyTarget)
  return proxyTarget
}

export function reactive(target: any) {
  return createReactive(target)
}
