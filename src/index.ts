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
class Piece {
    protected position: Position;
    constructor(
        private readonly color: Color, // Запись private в конструкторе автоматически присваивает параметр  к this (this.color) и устанавливает его видимость как приватную. Это значит, что код внутри экземпляра Piece может считывать из приватного параметра и производить в него запись, но код, находящийся вне экземпляра Piece, не может этого сделать. Различные экземпляры Piece могут получать доступ к приватным членам друг друга. Экземпляры же любого другого класса - даже подкласса Piece - не могут.
        file: FileVertical,
        rank: Rank,
    ) {
        this.position = new Position(file, rank);
    }
}

// Набор координат шахматной фигуры
class Position {
    constructor(private file: FileVertical, private rank: Rank) {}
}

// Есть шесть типов шахматной фигуры
class King extends Piece {}
class Queen extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Rook extends Piece {}
class Pawn extends Piece {}
