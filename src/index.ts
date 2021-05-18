type ElementType2<T> = T extends (infer U)[] ? U : T;
type B = ElementType2<number[]>; // number
type C = ElementType2<string[]>; // string
type E = ElementType2<boolean[]>; // boolean
