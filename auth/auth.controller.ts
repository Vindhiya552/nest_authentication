import { Controller, Get, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('check')
  check(@Req() req) {
    const token = req.cookies?.token;
    console.log(token);
    return token ? { auth: true } : { auth: false };
  }
}
