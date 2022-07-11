export namespace ToyT {
  export type Toy = {
    id: string;
    name: string;
    count: string;
    price: string;
    year: string;
    shape: Shape;
    color: Color;
    size: Size;
    favorite: boolean;
  };

  export type Size = 'большой' | 'средний' | 'малый';
  export type Color = 'желтый' | 'зелёный' | 'красный' | 'белый' | 'синий';
  export type Shape = 'шар' | 'фигурка' | 'колокольчик' | 'шишка' | 'снежинка';
}
