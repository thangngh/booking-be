import { Controller, UseGuards, Get, Post, Body, Patch, Res, Param, Delete, Query, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDTO } from 'common/pagination/dto/paginationQuery-dto';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from 'authentication/auth/guards/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import { SharpPipe } from 'common/pipes/sharp.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get("/all-doctor")
  getAllDoctor(@Query() query: PaginationDTO) {
    return this.userService.getAllDoctor(query)
  }


  @UseGuards(JwtGuard)
  @Get("/user-role")
  getUserRole(@ReqUser() user: User) {
    return this.userService.getUserRole(user)
  }

  @UseGuards(JwtGuard)
  @Get("/profile")
  getProfile(@ReqUser() user: User) {
    return this.userService.profile(user)
  }

  @UseGuards(JwtGuard)
  @Post("/upload-avatar")
  @UseInterceptors(FilesInterceptor('image'))
  uploadAvatar(@ReqUser() user: User, @UploadedFiles(SharpPipe) file: Array<Express.Multer.File>) {
    return this.userService.uploadAvatar(user, file);
  }

  @Get('get-image/:imgpath')
  async seenImage(@Param('imgpath') imgpath, @Res() res) {
    const bucket = admin.storage().bucket();

    const filePath = `uploads/${imgpath}`;

    // const file = bucket.file(filePath);
    // const readStream = file.createReadStream();
    // readStream.pipe(res);
    const file = bucket.file(filePath);

    // Get the download URL
    file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025'
    }, (err, url) => {
      if (!err) {
        // url is the download URL for the image
        // You can use this URL to display the image or download it
        res.send(url);
      }
    });
  }


}
