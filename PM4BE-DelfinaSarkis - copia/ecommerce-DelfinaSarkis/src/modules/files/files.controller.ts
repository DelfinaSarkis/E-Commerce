import { Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "../users/cloudinary.service";
import { Product } from "../products/products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService, private readonly cloudinaryService: CloudinaryService, @InjectRepository(Product) private productsRepository: Repository<Product>
    ) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('id') id: number, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                maxSize: 200000,
                message: 'El archivo debe ser menor a 200kb'
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
            ],
        }),
    ) file: Express.Multer.File,){
        const image = await this.cloudinaryService.uploadImage(file);
        await this.productsRepository.update(id, {imgUrl: image.url});
        return { success: 'Imagen subida con éxito!'};
        };
    }
