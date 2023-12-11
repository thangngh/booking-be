import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }


}
