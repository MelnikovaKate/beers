import React, { FC } from 'react';
import { PopupWindow } from 'components/PopupWindow';
import { Typography } from 'antd';
import styles from './BeerViewCard.module.less';
import { IBeerViewModel } from 'types/beer.type';
import { BeerViewCardText } from 'enums/BeerViewCardText';

const { Paragraph, Text } = Typography;

interface IBeerViewCardProps {
    viewModel: IBeerViewModel;
    isOpen: boolean;
    onClose?: () => void;
}

export const BeerViewCard: FC<IBeerViewCardProps> = ({
    viewModel,
    isOpen,
    onClose = () => {}
}) => {
    return (
        <PopupWindow
            isOpen={isOpen}
            viewButtons={false}
            isMainButton={false}
            onClose={onClose}
        >
            <div className={styles.container}>
                <Text className={styles.recordTitle}>{BeerViewCardText.Title}</Text>
                <div>
                    {Object.entries(viewModel).map(([key, value]) => (
                        value !== viewModel.description && (
                            <div className={styles.recordInfo}>
                                <Text className={styles.recordCommentLabel}>{key}</Text>
                                <Text className={styles.recordData}>
                                    {value}
                                    {value === viewModel.alchool && '%'}
                                </Text>
                            </div>
                        )
                    ))}
                </div>
                {Object.entries(viewModel).map(([key, value]) => (
                    value === viewModel.description && (
                        <div className={styles.recordCommentContainer}>
                            <Text className={styles.recordCommentLabel}>{key}</Text>
                            <Paragraph className={styles.recordData}>
                                {value}
                            </Paragraph>
                        </div>
                    )
                ))}
            </div>
        </PopupWindow>
    );
};