export const columnBeerNames = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Alcohol',
        dataIndex: 'alchool',
        key: 'alchool',
        render: (value: number) => `${value}%`,
        sorter: (a: { alchool: number; }, b: { alchool: number; }) => a.alchool - b.alchool,
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
];