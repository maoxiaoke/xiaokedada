
function format(a) {
    console.log('aa', a)
    return (t, n, des) => {
        console.log('t', t)
        console.log('n', n)
        console.log('des', des)
    }

}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return this.greeting;
    }
}