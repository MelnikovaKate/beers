import { Layout } from 'antd';
import { ReactNode } from 'react';

import styles from './App.module.less';
import React from 'react';

const { Content } = Layout;

interface IProps {
  children: ReactNode;
}

export const Main = ({ children }: IProps) => {

  return (
    <Layout className={styles.app}>
        <Layout>
            <Content className={styles.main}>{children}</Content>
        </Layout>
    </Layout>
  );
};