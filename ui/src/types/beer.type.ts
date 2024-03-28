import { AxiosResponse } from "axios";

export interface IBeer {
    title: string;
    alchool: string;
    description: string;
    country: string;
}

export interface IBeerViewModel {
    title: string;
    alchool: number;
    description: string;
    country: string;
}

export interface IBeerResponse extends AxiosResponse<IBeer[]> {};
