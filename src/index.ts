// Создадим упрощенную версию структуры данных Set,
// которая поддерживает две операции: добавление числа
// в набор и проверку, находится ли данное число в наборе.
// Используется она так
const set = new Set();
set.add(1).add(2).add(3);
set.has(1); // true
set.has(5); // false

// Определим класс Set начиная с метода has:
// class MySet1 {
//     has(value: number): boolean {
//         //...
//     }
// }

// Добавим add. Вызывая add, обратно вы получаете
// экземпляр класса Set. Можно типизировать так:
//
// class MySet2 {
//     has(value: number): boolean {
//         return false;
//     }
//     add(value: number): MySet2 {
//         // for example
//         return new MySet2();
//     }
// }

// но если мы создадим подкласс, то потребуется для
// метода add снова дописывать возвращаемый тип, но
// только уже как подкласс:
// class MutableSet extends MySet2 {
//     delete(value: number): boolean {
//         //...
//     }
//
//     add(value: number): MutableSet {
//         //...
//     }
// }

// Чтобы не прописывать каждый раз у подклассов возвра-
// щаемый тип, можно в базовом классе указать this

class MySet3 {
    has(value: number): boolean {
        return false;
    }
    add(value: number): this {
        console.log(this);
        return this;
    }
}

// Теперь можно убрать перезапись add(), поскольку
// this в MySet3 указывает на экземпляр MySet3, а
// this в MutableSet3 указывает на экземпляр MutableSet3

class MutableSet3 extends MySet3 {}

const mutable = new MutableSet3();
mutable.add(10).add(10);
