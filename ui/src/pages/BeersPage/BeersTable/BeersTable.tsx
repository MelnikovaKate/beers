import React, { FC, useState } from 'react';
import { columnBeerNames } from 'constants/columnBeerNames';
import { Table } from 'antd';
import { IBeerViewModel } from 'types/beer.type';
import { BeerViewCard } from 'components/BeerViewCard';

interface IBeersTableProps {
    beers: IBeerViewModel[];
}

export const BeersTable: FC<IBeersTableProps> = ({ beers }) => {
    const [isOpenViewModal, setIsOpenViewModal] = useState(false);

    const initViewModel: IBeerViewModel = {
        title: '',
        alchool: 0,
        description: '',
        country: '',
    }

    const [viewModel, setViewModel] = useState<IBeerViewModel>(initViewModel); 
    return (
    <div>
        <Table
            dataSource={beers}
            columns={columnBeerNames}
            onRow={(record) => {
                return {
                    onClick: () => {
                        setViewModel(record);
                        setIsOpenViewModal(prev => !prev);
                    },
                };
            }}
        />
        {isOpenViewModal && (
            <BeerViewCard
                viewModel={viewModel}
                isOpen={isOpenViewModal}
                onClose={() => setIsOpenViewModal(false)}
            />
        )}
    </div>
   
    );
};