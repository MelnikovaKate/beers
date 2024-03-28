import { useState, useMemo, useCallback, useEffect } from "react";
import { IBeerFilter } from "types/beerFilter.type";
import { IBeerViewModel } from "types/beer.type";
import { BeerService } from "services";
import { distinct } from "helpers/distinct";

export const useBeerPage = () => {
    const [beers, setBeers] = useState<IBeerViewModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<IBeerFilter>({
        title: null,
        alcohol: null,
        countries: null
    });

    const countries = useMemo(() => {
        const allCountries = beers.map(beer => beer.country);

        return distinct(allCountries);
    }, [beers]);

    const filteredBeers = useMemo(() => {
        let resultBeers = beers;

        if (filters.countries?.length) {
            resultBeers = resultBeers.filter(b => filters.countries?.includes(b.country));
        }

        if (filters.title?.length) {
            resultBeers = resultBeers.filter(b => b.title.toLowerCase().includes(filters.title?.toLowerCase() as string));
        }

        if (filters.alcohol?.min) {
            resultBeers = resultBeers.filter(b => b.alchool >= filters.alcohol?.min!);
        }

        if (filters.alcohol?.max) {
            resultBeers = resultBeers.filter(b => b.alchool <= filters.alcohol?.max!);
        }

        return resultBeers;
    }, [beers, filters]);

    const getBeers = useCallback(() => {
        setIsLoading(true);

        return BeerService.getAll().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        getBeers().then((resp) => {
            const beers = resp.data.map(beer => ({
                ...beer,
                alchool: +beer.alchool.replace('%', '')
            }));

            setBeers(beers);
        });
    }, [getBeers]);

    return {
        isLoading,
        countries,
        filteredBeers,
        setFilters
    }
}