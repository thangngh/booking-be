import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializedService } from './specialized.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('specialized')
@ApiTags("specialized")
export class SpecializedController {
  constructor(private readonly specializedService: SpecializedService) { }

  @Get("/get-all")
  getAll() {
    return this.specializedService.getAll();
  }
}
