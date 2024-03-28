import { AlcoholFilterValues } from "./AlcoholFilterValues.type";

export interface IBeerFilter {
    title: string | null;
    alcohol: AlcoholFilterValues | null;
    countries: string[] | null;
}