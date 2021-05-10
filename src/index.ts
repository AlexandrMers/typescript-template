class Payload {}

type ClassConstructor<T> = new (...args: any[]) => T; // *1 - new - это способ
// структурной типизации конструктора класса, который может быть расширен ( с помощью extends)
// TypeScript требует, чтобы его аргументы были типизированы с распространением
// any: new(...any[])

@serializable
class ApiPayload {
    getValue(): Payload {
        //...
        return new Payload();
    }
}

function serializable<
    // *2 - @serializable может декорировать любой класс, чьи экземпляры реализуют метод .getValue, возвращающий Payload
    T extends ClassConstructor<{
        getValue(): Payload;
    }>
>(Constructor: T) {
    // *3 - декораторы классов - это функции, получающие один аргумент - класс. Если функция декоратора вернет класс (как в примере), то он заменит декорируемый класс в среде выполнения. В противном случае он вернет оригинальный класс.
    return class extends Constructor {
        // *4 - для декорирования класса мы возвращаем класс, который его расширяет, и попутно добавляем метод .serialize
        serialize() {
            return this.getValue().toString();
        }
    };
}

const payload = new ApiPayload();
const serialized = payload.serialize(); // В данном случае будет ошибка, TypeScript сообщает нам, что метода .serialize() не существует в классе ApiPayload , так как TypeScript предполагает, что декоратор не изменяет форму того, что декорирует.
