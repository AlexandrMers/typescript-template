// Каждая фигура имеет цвет и текущую позицию. В шахматах позиции моделируются
// как пара координат (буква, число). Буквы идут слева-направо по оси Х, а числа
// снизу вверх по осих Y.

// Добавим цвет и позицию для класса Piece:
type Color = 'Black' | 'White';
type FileVertical = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'; // вертикаль (А-Н)
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // горизонталь (1-8)

// Представляем игру в шахматы
class Game {}

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
}

// Есть шесть типов шахматной фигуры
class King extends Piece {}
class Queen extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Rook extends Piece {}
class Pawn extends Piece {}
