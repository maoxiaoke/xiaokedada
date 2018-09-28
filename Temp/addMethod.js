function addMethod (object, name, fn) {
  let old = object[name]
  object[name] = function () {
    if (fn.length == arguments.length) {
      return fn.apply(thi, arguments)
    } else if (typeof old === 'function') {
      return old.apply(this, arguments)
    }
  }
}