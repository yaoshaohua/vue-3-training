export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export const mutableHandler: ProxyHandler<any> = {
  get(target, property, receiver) {
    if (property === ReactiveFlags.IS_REACTIVE) return true
    return Reflect.get
  },
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver)
  }
}
