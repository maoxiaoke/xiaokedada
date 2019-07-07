var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function log(message) {
    return function (target, name, descriptor) {
        var original = descriptor.value;
        if (typeof original === 'function') {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // console.log('target', target)
                // console.log('name', name)
                // console.log('descriptor', descriptor)
                // console.log('my name is ')
                console.log(message);
                return original.apply(this, args);
            };
        }
    };
}
var Person = /** @class */ (function () {
    function Person(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
    Person.prototype.getName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    __decorate([
        log('hello world')
    ], Person.prototype, "getName", null);
    return Person;
}());
var xiaoke = new Person('mao', 'xiaoke');
console.log(xiaoke.getName());
