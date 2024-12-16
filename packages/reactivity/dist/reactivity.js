// packages/shared/src/index.ts
function isObject(value) {
  return typeof value === "object" && value !== null;
}

// packages/reactivity/src/reactive.ts
var proxyMap = /* @__PURE__ */ new WeakMap();
var handler = {
  get(target, prop, receiver) {
    if (prop === "__v_isReactive" /* IS_REACTIVE */) return true;
    return Reflect.get;
  }
};
function createReactive(target) {
  if (!isObject(target)) return;
  if (target["__v_isReactive" /* IS_REACTIVE */]) return target;
  const existProxy = proxyMap.get(target);
  if (existProxy) return existProxy;
  const proxyTarget = new Proxy(target, handler);
  proxyMap.set(target, proxyTarget);
  return proxyTarget;
}
function reactive(target) {
  return createReactive(target);
}
export {
  reactive
};
//# sourceMappingURL=reactivity.js.map
