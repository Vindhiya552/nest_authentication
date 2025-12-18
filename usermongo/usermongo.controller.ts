import { Body, Controller, Post, Res } from '@nestjs/common';

import { createuserdto } from 'src/dto/user.dto';
import { logindto } from 'src/dto/login.dto';
import { UserMongoService } from './usermongo.service';
import type { Response } from 'express';

@Controller('user')
export class UserMongoController {
  constructor(private readonly appService: UserMongoService) {}

  @Post()
  Createuser(@Body() dto: createuserdto) {
    return this.appService.create(dto);
  }

  // @Post('login')
  // userlogin(@Body() dto: logindto) {
  //   return this.appService.login(dto);
  // }

  @Post('login')
  async userlogin(
    @Body() dto: logindto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.appService.login(dto);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        redirect: '/login',
      };
    }

    // Set COOKIE here
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false, // true only in production HTTPS
      sameSite: 'lax',
      // maxAge: 24 * 60 * 60 * 1000, // 1 day
      maxAge: 2 * 60 * 1000, // 2 minutes
    });

    // return {
    //   success: true,
    //   message: 'Login successful',
    //   user: result.user,
    //   // token: result.token,
    // };
    return {
      success: true,
      message: 'Login successful',
      redirect: '/Organisationlist',
    };
  }
}
