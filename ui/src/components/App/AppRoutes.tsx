import { ReactNode, useMemo } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Main } from './Main';
import React from 'react';
import { Path } from 'enums/path.enum';
import { BeersPage } from 'pages';

interface IAppRoute {
  path: Path | string;
  component: ReactNode;
  canActivate?: boolean;
  children?: IAppRoute[];
}

export const AppRoutes = () => {
  const routes = useMemo<IAppRoute[]>(
    () => [
      {
        path: '',
        component: (
          <Main>
            <Outlet />
          </Main>
        ),
        children: [
          {
            path: Path.BeersList,
            component: <Outlet key={Path.BeersList} />,
            children: [
              {
                path: '',
                component: <BeersPage />,
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const renderRoutes = (routeElements: IAppRoute[]) =>
    routeElements.map(({ path, component, children }) => {
      return (
        <Route key={path} path={path} element={component}>
          {children && renderRoutes(children)}
        </Route>
      );
    });

  return <Routes>{renderRoutes(routes)}</Routes>;
};
