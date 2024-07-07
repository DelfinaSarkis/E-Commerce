import { ProductCarritoDto } from "../dtos/productCarritoDto";

export class OrdersDto {
    /** 
    * El ID del usuario correspondiente de la orden
    */ 
    userId: string;

    /** 
    * El array de productos de la orden
    */ 
    products: ProductCarritoDto[];
}