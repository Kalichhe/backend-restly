import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-propery.dto';

@Controller('/property')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  getProperties() {
    return this.propertiesService.getProperties();
  }

  @Get('/:id')
  getPropertyById(id: string) {
    return this.propertiesService.getPropertyById(id);
  }

  @Post()
  async createProperty(@Body() property: CreatePropertyDto) {
    try {
      const newProperty = await this.propertiesService.createProperty(property);
      return newProperty;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Patch('/:id')
  updateProperty(@Body() property: UpdatePropertyDto, @Param('id') id: string) {
    return this.propertiesService.updateProperty(id, property);
  }

  @Delete('/:id')
  async deleteProperty(@Param('id') id: string) {
    try {
      await this.propertiesService.deleteProperty(id);
      return this.deleteInformationProperty();
    } catch (error) {
      return this.notFoundPage();
    }
  }

  @Get('new')
  @HttpCode(201)
  newProperty() {
    return 'New property created successfully';
  }

  @Get('notfound')
  @HttpCode(404)
  notFoundPage() {
    return '404 Not Found';
  }

  @Get('error')
  @HttpCode(500)
  errorPage() {
    return '500 Internal Server Error';
  }

  @Get('delete')
  @HttpCode(204)
  deleteInformationProperty() {
    return 'There is no property information\n 204 No Content';
  }
}
