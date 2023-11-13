import { Module } from '@nestjs/common';
import { StorageConfigService } from './storage-config.service';
import { MulterModule } from '@nestjs/platform-express'
@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: StorageConfigService
    })
  ],
  providers: [StorageConfigService],
  exports: [StorageConfigService]
})
export class StorageModule { }
