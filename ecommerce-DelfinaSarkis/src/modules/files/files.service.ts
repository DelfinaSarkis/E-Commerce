import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./files.entity";
import { Repository } from "typeorm";
import { Product } from "../products/products.entity";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File) private readonly filesRepository: Repository<File>
    ) {}

    async saveFile({
        name, mimeType, data, product
    } : {
        name: string;
        mimeType: string;
        data: Buffer;
        product: Product;
    }) {
        const file = new File();
        file.name = name;
        file.mimetype = mimeType;
        file.data = data;
        file.product = product;

        return this.filesRepository.save(file);
    }

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>{
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if(error){
                        reject(error);
                    } else {
                        resolve(result);
                    }
                },
            );
            toStream(file.buffer).pipe(upload);
        })
    }
}