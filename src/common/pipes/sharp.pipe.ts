/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import path from "path";
import sharp from "sharp";
import * as admin from 'firebase-admin';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {

    private readonly maxSize = 1024 * 1024 * 2  //2MB;
    private readonly allowedMimeTypes = ['image/jpeg', 'image/png']
    constructor(

    ) { }

    async transform(file: Express.Multer.File): Promise<any> {
        if (Array.isArray(file)) {

            const fileLocal: string[] = [];

            for (const fl of file) {
                if (this.maxSize < fl.size) {
                    throw new BadRequestException('File is too large');
                }

                if (!this.allowedMimeTypes.includes(fl.mimetype)) {
                    throw new BadRequestException('Invalid file type');
                }
                const originalName = path.parse(fl.originalname).name;
                // const ext = fl.mimetype.startsWith("image/") ? ".webp" : ".webm"

                const ext = ".webp";

                const filename = Date.now() + '-' + originalName + ext

                if (fl.mimetype.startsWith('image/')) {
                    const imageBuffer = await sharp(fl.buffer)
                        .resize(400)
                        .webp({ effort: 3 })
                        .toBuffer();

                    const bucket = await admin.storage().bucket();
                    await bucket.file(`uploads/${filename}`).save(imageBuffer);
                }
                fileLocal.push(filename)
            }
            return fileLocal;
        }
    }
}