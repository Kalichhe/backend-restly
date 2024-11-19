import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreatePropertyDto {

  @IsString()
  @IsOptional()
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

  @IsNumber()
  @IsNotEmpty()
  price_per_night: number;

  @IsNumber()
  @IsNotEmpty()
  num_bedrooms: number;

  @IsNumber()
  @IsNotEmpty()
  num_bathrooms: number;

  @IsNumber()
  @IsNotEmpty()
  max_guests: number;
}