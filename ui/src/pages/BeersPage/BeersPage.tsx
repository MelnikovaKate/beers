import React from 'react';
import styles from './BeersPage.module.less';
import { BeersTable } from './BeersTable';
import { Filters } from './Filters';
import { Spin } from 'antd';
import cn from 'classnames';
import { useBeerPage } from './hooks/useBeerPage';

export const BeersPage = () => {
 
    const {
        isLoading,
        countries,
        filteredBeers,
        setFilters
    } = useBeerPage();
    
    return (
        <Spin spinning={isLoading} size="large">
            <div className={cn(styles.container)}>
                <Filters countries={countries} handleFilters={setFilters}/>
                <BeersTable beers={filteredBeers} />
            </div>
        </Spin>
    );
};