function log (message) {
  return (target, name, descriptor) => {
    const original = descriptor.value
    if (typeof original === 'function') {
      descriptor.value = function (...args) {
        // console.log('target', target)
        // console.log('name', name)
        // console.log('descriptor', descriptor)
        // console.log('my name is ')
        console.log(message)
        return original.apply(this, args)
      }
    }
  }

}

class Person {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
  @log('hello world')
  getName () {
    return this.firstName + ' ' + this.lastName
  }
}

const xiaoke = new Person('mao', 'xiaoke')
console.log(xiaoke.getName())