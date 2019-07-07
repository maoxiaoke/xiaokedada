function log (target, name, descriptor) {
  const original = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      console.log('my name is ')
      return original.apply(this, args)
    }
  }
}

class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
  @log
  getName () {
    return this.firstName + ' ' + this.lastName
  }
}