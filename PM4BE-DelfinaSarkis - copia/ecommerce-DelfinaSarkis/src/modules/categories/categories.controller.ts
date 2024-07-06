    import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CategoriesService } from "./categoriesService";
import { Category } from "./categories.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @HttpCode(200)
    @Get('seeder')
    async cateogriesSeeder(){
        return this.categoriesService.seedCategories();
    }

    @HttpCode(200)
    @Get()
    async getCategories(){
        return this.categoriesService.getCategories();
    }

    @HttpCode(200)
    @Post()
    async addCategories(@Body() category: Category){
        return this.categoriesService.addCategories(category);
    }
}