import DataTable from 'react-data-table-component';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Button, FontIcon, Checkbox } from 'react-md';



const data = [
    { id: 1, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 2, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 3, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 4, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 5, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 6, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 7, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 8, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 9, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 10, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 11, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 12, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' },
    { id: 13, title: 'Conan the Barbarian', director: 'Jayden Fred',  year: '1982', image: 'http://conan.image.png' }



]
 

const columns = [
    {
        name:'#',
        selector:'id'

    },

    {
      name: 'Title',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Director',
      selector: 'director',
      sortable: true,
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
    },
  ];
  
  const BasicPaginationTable = () => (
    <DataTable
      title="Movie List"
      columns={columns}
      data={data}
      pagination
    />
  );
  
  
  storiesOf('Pagination', module)
    .add('Basic', BasicPaginationTable);

    export default BasicPaginationTable;

