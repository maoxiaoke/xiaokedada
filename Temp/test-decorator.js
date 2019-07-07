var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function log(target, name, descriptor) {
    var original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log('my name is ');
            return original.apply(this, args);
        };
    }
}
var User = /** @class */ (function () {
    function User(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
    User.prototype.getName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    __decorate([
        log
    ], User.prototype, "getName", null);
    return User;
}());
