// Каждая фигура имеет цвет и текущую позицию. В шахматах позиции моделируются
// как пара координат (буква, число). Буквы идут слева-направо по оси Х, а числа
// снизу вверх по осих Y.

// Добавим цвет и позицию для класса Piece:
type Color = 'Black' | 'White';
type FileVertical = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'; // вертикаль (А-Н)
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // горизонталь (1-8)

// Набор координат шахматной фигуры
class Position {
    constructor(
        private file: FileVertical, // Запись private в конструкторе автоматически присваивает параметр  к this (this.file)
        // и устанавливает его видимость как приватную. Это значит, что код внутри экземпляра Piece может считывать из приватного параметра
        // и производить в него запись, но код, находящийся вне экземпляра Position, не может этого сделать.
        // Различные экземпляры Piece могут получать доступ к приватным членам друг друга.
        // Экземпляры же любого другого класса - даже подкласса Position - не могут.
        private rank: Rank,
    ) {}

    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
        };
    }
}

// Шахматная фигура
abstract class Piece {
    protected position: Position;

    constructor(private readonly color: Color, file: FileVertical, rank: Rank) {
        this.position = new Position(file, rank);
    }

    moveTo(position: Position) {
        this.position = position;
    }

    abstract canMoveTo(position: Position): boolean;
}

// Есть шесть типов шахматной фигуры
class King extends Piece {
    canMoveTo(position: Position): boolean {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    }
}
class Queen extends Piece {
    canMoveTo(position: Position): boolean {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    }
}
// class Bishop extends Piece {}
// class Knight extends Piece {}
// class Rook extends Piece {}
// class Pawn extends Piece {}

// В начале новой игры мы будем автоматически создавать доску и фигуры
class Game {
    private pieces = Game.makePieces();

    private static makePieces() {
        return [
            //Короли
            new King('White', 'E', 1),
            new King('Black', 'E', 8),

            //Ферзи
            new Queen('White', 'D', 1),
            new Queen('Black', 'D', 8),

            // ...
        ];
    }
}
