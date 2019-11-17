import { IsNotEmpty, IsString, MinLength, Max, MaxLength, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password to short' })
  @MaxLength(20, { message: 'password to max characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password to weak'})
  @ApiModelProperty()
  password: string;
}
