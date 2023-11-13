import { Injectable } from '@nestjs/common';
import { Options } from 'multer';
@Injectable()
export class StorageConfigService implements MulterOptionsFactory {

    createMulterOptions(): MulterModuleOptions {
        return {
            dest: './upload',
        };
    }
}


export type MulterModuleOptions = Options;
/**
 * @publicApi
 */
export interface MulterOptionsFactory {
    createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions;
}