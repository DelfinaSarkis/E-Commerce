import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dtos/createOrders.dto";
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersControllers {
    constructor(private readonly ordersService:OrdersService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Post()
    async createOrder(@Body() body:CreateOrderDto):Promise<Order>{
        try{
            const {userId, products} = body;
        return this.ordersService.createOrder(userId, products);
        } catch (error) {
            throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get(":id")
    @UsePipes(new ValidationPipe({ transform: true }))
    async getOrder(@Param('id', ParseUUIDPipe) id:string){
        try{
            const order = await this.ordersService.getOrder(id);
            if(!order){
                throw new NotFoundException(`Orden con ID ${id} no encontrado`);
            }
            return order;
        } catch (error){
            if (error instanceof NotFoundException){
                throw error;
            } else{
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}