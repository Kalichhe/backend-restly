import { Injectable, NotFoundException } from '@nestjs/common';

import { supabase } from './../supabaseClient';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-propery.dto';

@Injectable()
export class PropertiesService {
  // Obtenemos todas las propiedades
  async getProperties() {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      console.error('Error fetching properties from Supabase:', error);
      throw new Error(`Error fetching properties: ${JSON.stringify(error)}`);
    }

    if (properties && properties.length > 0) {
      return properties;
    } else {
      throw new NotFoundException('Properties not found');
    }
  }

  // Obtenemos una propiedad por id desde Supabase
  async getPropertyById(id: string) {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property by id:', error);
      throw new NotFoundException('Property not found');
    }

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  // Crear una propiedad
  async createProperty(property: CreatePropertyDto) {
    // Crear un id único con la estructura property_#
    const { data: properties, error } = await supabase
      .from('properties')
      .select('id');

    if (error) {
      console.error('Error fetching properties for id generation:', error);
      throw new Error(`Error fetching properties: ${JSON.stringify(error)}`);
    }

    const maxId = properties
      .map((prop: any) => parseInt(prop.id.replace('property_', ''), 10))
      .reduce(
        (max: number, current: number) => (current > max ? current : max),
        0,
      );

    const newProperty = { ...property, id: `property_${maxId + 1}` };

    const { data, error: createError } = await supabase
      .from('properties')
      .insert([newProperty])
      .select();

    if (createError) {
      console.error('Error creating property:', createError);
      throw new Error(
        `Error creating property: ${JSON.stringify(createError)}`,
      );
    }

    console.log('Property created:', newProperty);

    return newProperty;
  }

  // Actualizar una propiedad
  async updateProperty(id: string, property: UpdatePropertyDto) {
    const { data, error } = await supabase
      .from('properties')
      .update(property)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating property:', error);
      throw new Error(`Error updating property: ${JSON.stringify(error)}`);
    }

    if (data && data.length > 0) {
      return property;
    } else {
      throw new NotFoundException('Property not found');
    }
  }

  // Eliminar una propiedad
  async deleteProperty(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error deleting property:', error);
      throw new Error(`Error deleting property: ${JSON.stringify(error)}`);
    }

    if (data && data.length > 0) {
      return { message: 'Property deleted' };
    } else {
      throw new NotFoundException('Property not found');
    }
  }
}
