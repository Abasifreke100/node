import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { USER_UPDATED } from 'src/common/constants/user.constants';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async findCurrentUser(@Request() req): Promise<UserDocument> {
    return await this.userService.findById(req.user);
  }

  @ResponseMessage(USER_UPDATED)
  @Patch('me')
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    console.log(updateUserDto);
    return await this.userService.update(req.user._id, updateUserDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
