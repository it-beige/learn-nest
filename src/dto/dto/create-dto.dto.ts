import {
  Contains,
  IsInt,
  Length,
  Min,
  Max,
  IsEmail,
  IsFQDN,
} from 'class-validator';

export class CreateDtoDto {
  @Length(10, 20)
  title: string;

  @Contains('hello', {
    // message: 'text is string',
    message: (validationArguments) => {
      const { targetName, property, value } = validationArguments;
      return `${targetName} DTO property ${property} is sring but value ${value}`;
    },
  })
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;
}
