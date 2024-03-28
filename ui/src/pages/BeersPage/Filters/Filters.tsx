import React, { FC } from 'react';
import { Typography, Select, Space, Input } from 'antd';
import styles from './Filters.module.less';
import { IBeerFilter } from 'types/beerFilter.type';
import { useFilters } from './hooks/useFilters';
import { FiltersText } from 'enums/FiltersText.enum';

const { Text } = Typography;

interface IFiltersProps {
    countries: string[];
    handleFilters: (filters: IBeerFilter) => void;
}

export const Filters: FC<IFiltersProps> = ({ countries, handleFilters }) => {    
    const {
        options,
        minAlcohol,
        maxAlcohol,
        onSearchTitle,
        onChangeMinAlcohol,
        onChangeMaxAlcohol,
        handleChangeCountry,
        handleKeyDown
    } = useFilters(countries, handleFilters);
      
    return (
        <div className={styles.container}>
            <div className={styles.filterPanel}>
                <div className={styles.lineGroup}>
                    <div className={styles.columnGroup}>
                        <Text className={styles.label}>{FiltersText.Title}</Text>
                        <div className={styles.buttonsWrapper}>
                            <Input
                                placeholder={FiltersText.PlaceholderTitle}
                                onChange={(e) => onSearchTitle(e.target.value)}
                                style={{ width: 304 }}
                                allowClear
                            />
                        </div>
                    </div>
                    <div className={styles.columnGroup}>
                        <Text className={styles.label}>{FiltersText.Alcohol}</Text>
                        <div className={styles.buttonsWrapper}>
                            <Space direction="horizontal">
                                <Input
                                    ref={minAlcohol}
                                    placeholder={FiltersText.PlaceholderMinAlcohol}
                                    allowClear
                                    addonAfter={'%'}
                                    style={{ width: 100 }}
                                    onChange={(e) => onChangeMinAlcohol(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <Input
                                    ref={maxAlcohol}
                                    placeholder={FiltersText.PlaceholderMaxAlcohol}
                                    allowClear
                                    addonAfter={'%'}
                                    style={{ width: 100 }}
                                    onChange={(e) => onChangeMaxAlcohol(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </Space>
                        </div>
                    </div>
                    <div className={styles.columnGroup}>
                        <Text className={styles.label}>{FiltersText.Country}</Text>
                        <div className={styles.buttonsWrapper}>
                            <Select
                                mode="multiple"
                                style={{ width: '300px' }}
                                placeholder={FiltersText.PlaceholderCountry}
                                onChange={handleChangeCountry}
                                optionLabelProp="label"
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};