import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from 'src/modules/products/products.entity';

export class CreateOrderDto { 
    /** 
    * El ID del usuario dueño de la orden
    * @example 6af794ab-355e-4a90-82da-57cdb6df9fca
    */ 
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    /** 
    * Los productos de la orden
    */ 
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Product)
    products: Product[];
}