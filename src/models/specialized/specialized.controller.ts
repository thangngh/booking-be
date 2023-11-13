import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializedService } from './specialized.service';
import { CreateSpecializedDto } from './dto/create-specialized.dto';
import { UpdateSpecializedDto } from './dto/update-specialized.dto';

@Controller('specialized')
export class SpecializedController {
  constructor(private readonly specializedService: SpecializedService) { }


}
