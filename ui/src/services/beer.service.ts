import { Beers } from 'enums/endpoint.enum';
import { IBeer, IBeerResponse } from 'types/beer.type';
import { protectedAxios } from 'interceptors';

export const BeerService = {
  async getAll(): Promise<IBeerResponse> {
    return protectedAxios.get<IBeer[]>(`${Beers.base}`);
  },

  async getByCountry(country: string): Promise<IBeerResponse> {
    return protectedAxios.get<IBeer[]>(`${Beers.getByCountry(country)}`);
  },
};


