import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/categories.entity";


@Injectable()
export class ProductsRepository {

    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>, @InjectRepository(Category) private categoryRepository: Repository<Category>){}
    private products = [
        {
          name: "Iphone 15",
          description: "The best smartphone in the world",
          price: 199.99,
          stock: 12,
          category: "smartphone"
        },
        {
          name: "Samsung Galaxy S23",
          description: "The best smartphone in the world",
          price: 150.0,
          stock: 12,
          category: "smartphone"
        },
        {
          name: "Motorola Edge 40",
          description: "The best smartphone in the world",
          price: 179.89,
          stock: 12,
          category: "smartphone"
        },
        {
          name: "Samsung Odyssey G9",
          description: "The best monitor in the world",
          price: 299.99,
          stock: 12,
          category: "monitor"
        },
        {
          name: "LG UltraGear",
          description: "The best monitor in the world",
          price: 199.99,
          stock: 12,
          category: "monitor"
        },
        {
          name: "Acer Predator",
          description: "The best monitor in the world",
          price: 150.0,
          stock: 12,
          category: "monitor"
        },
        {
          name: "Razer BlackWidow V3",
          description: "The best keyboard in the world",
          price: 99.99,
          stock: 12,
          category: "keyboard"
        },
        {
          name: "Corsair K70",
          description: "The best keyboard in the world",
          price: 79.99,
          stock: 12,
          category: "keyboard"
        },
        {
          name: "Logitech G Pro",
          description: "The best keyboard in the world",
          price: 59.99,
          stock: 12,
          category: "keyboard"
        },
        {
          name: "Razer Viper",
          description: "The best mouse in the world",
          price: 49.99,
          stock: 12,
          category: "mouse"
        },
        {
          name: "Logitech G502 Pro",
          description: "The best mouse in the world",
          price: 39.99,
          stock: 12,
          category: "mouse"
        },
        {
          name: "SteelSeries Rival 3",
          description: "The best mouse in the world",
          price: 29.99,
          stock: 12,
          category: "mouse"
        }
    ]

    async getProducts(page:number, limit:number){
        let arraycopy = await this.productsRepository.find();
        let inicio = (page - 1) * limit;
        let final = page * limit;

        return arraycopy.slice(inicio, final)
    }

    async getByName(name){
      const product = await this.productsRepository.findOne({ where: { name: name, active: true } });
      if(!product){
        throw new NotFoundException('Producto no encontrado');
    }
        return product;
    }

    async getById(id){
        return this.productsRepository.findBy(id);
    }

    async createProducts(product){
        return this.productsRepository.save(product);
    }

    async updateProducts(id: string, updateProducts: Partial<Product>): Promise<string> {
      const product = await this.productsRepository.findOne( { where: {id, active:true} } )
      if(!product){
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      try{
        await this.productsRepository.update(id, updateProducts);
      return id;
      } catch (error){
        throw new InternalServerErrorException(`Error actualizando el producto con id ${id}: ${error.message}`);
      }
    }

    async deleteProducts(id: string): Promise<string> {
      const product = await this.productsRepository.findOne({ where: { id: id, active: true } })
      if (!product || product.active === false) {throw new NotFoundException("Producto no encontrado o eliminado")}
      await this.productsRepository.update( id, {...product, active: false});

      return id;
    }

    async productsSeeder(){
      try{
        for (const product of this.products){
          const productsFind = await this.productsRepository.findOne({ where: {name: product.name, active: true }});
          if (productsFind){
            console.log("Producto encontrado");
          } else {
            const productCategory = await this.categoryRepository.findOne({ where: {name: product.category } });
            const productToSave = {...product, category: productCategory}
            await this.productsRepository.save(productToSave)
          }
        }
      } catch(err) {return err}
    }
}