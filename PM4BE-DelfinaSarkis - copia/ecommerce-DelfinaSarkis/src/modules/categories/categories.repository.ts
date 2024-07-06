import { Injectable } from "@nestjs/common";
import { Category } from "./categories.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    private preCargaCategories = [
        {name: 'Electrónica'},
        {name: 'Ropa y Accesorios'},
        {name: 'Hogar y Cocina'},
        {name: 'Libros'},
        {name: 'Deportes'},
        {name: 'Juguetes y Juegos'},
        {name: 'Salud y Belleza'},
        {name: 'Automóviles y Motos'},
        {name: 'Mascotas'},
        {name: 'Alimentos y Bebidas'},
        {name: 'Herramientas'},
        {name: 'Jardín y Exterior'},
        {name: 'Electrodomésticos'},
        {name: 'Bebés y Niños'},
        {name: 'Muebles'},
        {name: 'Arte y Manualidades'},
        {name: 'Instrumentos Musicales'},
        {name: 'Películas y Series'},
        {name: 'Computadoras y Accesorios'},
        {name: 'Celulares y Accesorios'},
        {name: 'Viajes'}
    ]

    getCategories() {
        return this.categoryRepository.find()
    }

    addCategories(category) {
        return this.categoryRepository.save(category)
    }

    async seedCategories() {
        try {
            for (const category of this.preCargaCategories) {
                const categoryFind = await this.categoryRepository.findOne({where: {name: category.name}})
                if (!categoryFind) {await this.categoryRepository.save(category)}
                else {console.log("Categoria repetida: " + category.name)}
            }
        } catch(err) {return err}
        }
    }