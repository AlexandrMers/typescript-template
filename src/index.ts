type ClassConstructor<T> = new (...args: any[]) => T; // Объявляем тип ClassContructor. Указываем, что конструктор - это нечто созданное с new и способное получать любое число аргументов любого типа.

function withEZDebug<
    // Объявляем примесь withEZDebug с одним параметром типа ClassType. Он должен быть конструктором класса, который мы приведем в исполнение при помощи extends
    ClassType extends ClassConstructor<{
        getDebugValue(): {}; // Привязываем к CkassConstructor форму ClassType, гарантируя, что переданный нами в withEZDebug конструктор как минимум определяет метод .getDebugValue()
    }>
>(Class: ClassType) {
    return class extends Class {
        // Поскольку примесь является функцией, получающей конструктор и возвращающей конструктор, мы возвращаем анонимный конструктор класса.
        constructor(...args: any[]) {
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
    constructor(private id: number, private firstName: string, private lastName: string) {}

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
