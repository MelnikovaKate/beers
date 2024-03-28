import { environment } from "environments";

class API {
  static readonly base = environment.baseApiUrl;
}

export class Beers {
  static readonly base = `${API.base}/beers`;

  static readonly getByCountry = (country: string) => `${Beers.base}/${country}`;
}