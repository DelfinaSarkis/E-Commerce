export class ProductDto {
    /** 
    * El nombre del producto
    * @example mouse
    */ 
    name: string;
    /** 
    * La descripción del producto
    * @example mouse logitech último modelo
    */ 
    description: string;
    /** 
    * El precio del producto
    * @example 30
    */ 
    price: number;
    /** 
    * El stock del producto
    * @example 5
    */ 
    stock: boolean;
    /** 
    * La imagen del producto
    * @example https://example.com/images/mouse.jpg
    */ 
    imgUrl: string;
}