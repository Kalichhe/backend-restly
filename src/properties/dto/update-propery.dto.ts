import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdatePropertyDto {

  @IsString()
  id: string;

  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  descriction: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  price_per_night: number;

  @IsString()
  @IsNotEmpty()
  num_bedrooms: number;

  @IsString()
  @IsNotEmpty()
  num_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  max_guests: number;
}