"use strict";
function withEZDebug(Class) {
    return class extends Class {
        // Поскольку примесь является функцией, получающей конструктор и возвращающей конструктор, мы возвращаем анонимный конструктор класса.
        constructor(...args) {
            // конструктор класса должен получить как минимум те же аргументы, что и передаваемый класс. Но мы не знаем, какой класс будет передан, и нужно сохранять конструктор обобщенным.
            super(...args); // Поскольку анонимный класс расширяет другой класс, для корректной взаимосвязи потрубется вызвать и конструктор Class
        }
        debug() {
            const name = Class.constructor.name;
            const value = this.getDebugValue();
            return name + `(${JSON.stringify(value)})`;
        }
    };
}
class HardToDebugUser {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + ' ' + this.lastName,
        };
    }
}
const User = withEZDebug(HardToDebugUser);
const user = new User(3, 'Emma', 'Gluzman');
console.log(user.debug());
//# sourceMappingURL=index.js.map