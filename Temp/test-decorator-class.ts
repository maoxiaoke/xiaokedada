function loginStatus <T extends {new(...args:any[]):{}}>(User:T) {
  return class extends User {
    isLoggedIn
    constructor (...args) {
      super(...args)
      this.isLoggedIn = false
    }
    setLoggedIn () {
      this.isLoggedIn = true
    }
  }
}

@loginStatus
class User {
  private firstName
  private lastName
  constructor (first: string, last: string) {
    this.firstName = first
    this.lastName = last
  }
}

const user = new User('mao', 'xiaoke')
