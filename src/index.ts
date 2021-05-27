// определим тип Option

interface Option<T> {
    flatMap<U>(f: (value: T) => None): None;
    flatMap<U>(f: (value: T) => Option<U>): Option<U>;
    getOrElse(value: T): T;
}

// определим класс Some, который является подтипом Option
class Some<T> implements Option<T> {
    constructor(private value: T) {}
    flatMap<U>(f: (value: T) => None): None;
    flatMap<U>(f: (value: T) => Some<U>): Some<U>;
    flatMap<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.value);
    }
    getOrElse(): T {
        return this.value;
    }
}

// определим класс None, который также является подтипом Option
// tslint:disable-next-line:max-classes-per-file
class None implements Option<never> {
    flatMap(): None {
        return this;
    }
    getOrElse<U>(value: U): U {
        return value;
    }
}

// Осталось реализовать функцию Option, здесь также будем использовать перегрузку сигнатуры:
function option<T>(value: null | undefined): None; // *1
function option<T>(value: T): Some<T>; // *2
function option<T>(value: T): Option<T> {
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
