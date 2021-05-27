"use strict";
// определим тип Option
// определим класс Some, который является подтипом Option
class Some {
    constructor(value) {
        this.value = value;
    }
    flatMap(f) {
        return f(this.value);
    }
    getOrElse() {
        return this.value;
    }
}
// определим класс None, который также является подтипом Option
// tslint:disable-next-line:max-classes-per-file
class None {
    flatMap() {
        return this;
    }
    getOrElse(value) {
        return value;
    }
}
function option(value) {
    if (value == null) {
        return new None();
    }
    return new Some(value);
}
const result = option(6)
    .flatMap((value) => option(value.toString()))
    .flatMap((value) => new None())
    .getOrElse('error'); // В данном случае ts четко понимает, что будет выведен текст 'error'
// tslint:disable-next-line:no-console
console.log('result 1', result);
const result2 = option('text')
    .flatMap((value) => option(Number(value)))
    .flatMap((value) => new Some(value.toString()))
    .flatMap((value) => new Some(3))
    .getOrElse(); // В данном случае ts не требует введения значения по умолчанию, потому что четко понимает, что возвращается number
// tslint:disable-next-line:no-console
console.log('result 2', result2);
//# sourceMappingURL=index.js.map