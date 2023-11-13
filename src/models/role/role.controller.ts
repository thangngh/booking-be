import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('role')
@ApiExcludeController()
export class RoleController {
  constructor(private readonly roleService: RoleService) { }


}
