import { IBeerFilter } from "types/beerFilter.type";
import { useState, useRef, useMemo, useEffect } from "react";
import { AlcoholFilterValues } from "types/AlcoholFilterValues.type";
import { InputRef, SelectProps } from "antd";

export const useFilters = (countries: string[], handleFilters: (filters: IBeerFilter) => void) => {
    const [titleFilter, setTitleFilter] = useState<string | null>(null);
    const [countriesFilter, setCountriesFilter] = useState<string[] | null>(null);
    const [alcoholFilter, setAlcoholFilter] = useState<AlcoholFilterValues | null>(null);
    const minAlcohol = useRef<InputRef>(null);
    const maxAlcohol = useRef<InputRef>(null);
    const [options, setOptions] = useState<SelectProps['options']>([]);

    const filters = useMemo<IBeerFilter>(() => {
        return {
            title: titleFilter,
            countries: countriesFilter,
            alcohol: alcoholFilter
        }
    }, [titleFilter, countriesFilter, alcoholFilter]);

    const onSearchTitle = (value: string) => {
        setTitleFilter(value);
    };
    
    const handleChangeCountry = (value: string[]) => {
        setCountriesFilter(value);
    };

    const onChangeMinAlcohol = (minValue: string) => {
        const numericRegex = /^[0-9.]*$/;

        if (numericRegex.test(minAlcohol.current?.input?.value!!)) {
            setAlcoholFilter({
                ...alcoholFilter,
                min: +minValue,
            });
        }
    }

    const onChangeMaxAlcohol = (maxValue: string) => {
        const numericRegex = /^[0-9.]*$/;

        if (numericRegex.test(maxAlcohol.current?.input?.value!!)) {
            setAlcoholFilter(prev => ({
                ...prev,
                max: +maxValue,
            }));
        
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!(
            (e.key >= '0' && e.key <= '9') ||
            e.key === '.' ||
            e.key === 'Backspace' ||
            e.key === 'Delete'
          )
        ) {
          e.preventDefault();
        }
    };

    useEffect(() => {
        handleFilters(filters);
    }, [filters]);


    useEffect(() => {
        const options: SelectProps['options'] = countries.map(country => {
            return {
                label: country,
                value: country,
                desc: country,
            };
        });
        
        setOptions(options);
    }, [countries]);

    return {
        options,
        minAlcohol,
        maxAlcohol,
        onSearchTitle,
        onChangeMinAlcohol,
        onChangeMaxAlcohol,
        handleChangeCountry,
        handleKeyDown
    }
}