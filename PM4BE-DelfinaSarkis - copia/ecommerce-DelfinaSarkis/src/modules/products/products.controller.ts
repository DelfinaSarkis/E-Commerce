import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../guards/auth.guard";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "../auth/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @HttpCode(200)
    @Get()
    async getProducts(@Query('name') name?: string, @Query('page') page: string = '1', @Query('limit') limit: string = '5'){
        try{
            if(name){
            const product = await this.productsService.getProductsByName(name);
            if (!product){
                throw new NotFoundException('Producto no encontrado')
            }
            return product;
        }
        return this.productsService.getProducts(page, limit);
        } catch (error) {
            if (error instanceof NotFoundException){
                throw error;
            } else {
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
    }

    @HttpCode(200)
    @Get('seeder')
    async productsSeeder(){
        return this.productsService.productsSeeder();
    }

    @HttpCode(200)
    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getProductsById(@Param('id', ParseUUIDPipe) id: string){
        try{
            const product = await this.productsService.getProductsById(Number(id));
            if(!product){
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }
            return product;
        } catch (error) {
            if (error instanceof NotFoundException){
                throw error;
            } else {
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    @Post()
    createProducts(@Body() product: ProductDto) {
        try{
            return this.productsService.createProducts(product);
        } catch (error){
            throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    @Put(':id')
    @Roles(Role.Admin)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateProducts(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: Partial<Product>): Promise<{ id: string }> {
        try{
            const updatedProductsId = await this.productsService.updateProducts(id, updateProductDto);
            if(!updatedProductsId){
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }
            return { id: updatedProductsId};
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            } else {
                throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Delete(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async deleteProducts(@Param('id', ParseUUIDPipe) id: string): Promise<{ id: string }> {
        try{
            await this.productsService.deleteProducts(id);
        return { id: id };
        } catch (error){
            throw new HttpException('Error en el servidor interno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}