import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import differenceBy from 'lodash/differenceBy';
import 'react-md/dist/react-md.pink-blue.min.css';
import { Card, Button, FontIcon, Checkbox } from 'react-md';
//import tableDataItems from '../constants/sampleDesserts';
import DataTable, { memoize } from 'react-data-table-component';


const tableDataItems = [
    { id:1, name: 'Conan the Barbarian', type: 'Jayden Fred',  calories: '1982', fat: 'http://conan.image.png', carbs:'20%', sodium:'10%', protein:'greater', sodium:'jay', calcium:'high', iron:'live'  },
   


]
 

const sortIcon = <FontIcon>arrow_downward</FontIcon>;
const selectProps = { uncheckedIcon: isIndeterminate => (isIndeterminate ? <FontIcon>indeterminate_check_box</FontIcon> : <FontIcon>check_box_outline_blank</FontIcon>) };
const actions = <Button key="add" flat secondary iconChildren="add">Add</Button>;
const contextActions = memoize(deleteHandler => <Button key="delete" onClick={deleteHandler} style={{ color: 'red' }} icon>delete</Button>);
const columns = memoize(() => [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    grow: 2,
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
  },
  {
    name: 'Calories (g)',
    selector: 'calories',
    sortable: true,
    right: true,
  },
  {
    name: 'Fat (g)',
    selector: 'fat',
    sortable: true,
    right: true,
  },
  {
    name: 'Carbs (g)',
    selector: 'carbs',
    sortable: true,
    right: true,
  },
  {
    name: 'Protein (g)',
    selector: 'protein',
    sortable: true,
    right: true,
  },
  {
    name: 'Sodium (mg)',
    selector: 'sodium',
    sortable: true,
    right: true,
  },
  {
    name: 'Calcium (%)',
    selector: 'calcium',
    sortable: true,
    right: true,
  },
  {
    name: 'Iron (%)',
    selector: 'iron',
    sortable: true,
    right: true,
  },
]);

class MaterialTable extends PureComponent {
  state = { selectedRows: [], toggleCleared: false, data: tableDataItems };

  handleChange = state => {
    this.setState({ selectedRows: state.selectedRows });
  };

  handleRowClicked = row => {
    
    console.log(`${row.name} was clicked!`);
  }

  deleteAll = () => {
    const { selectedRows } = this.state;
    const rows = selectedRows.map(r => r.name);
    
    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
    }
  }

  render() {
    const { data, toggleCleared } = this.state;

    return (
      <Card style={{ height: '100%' }}>
        <DataTable
          title="Desserts"
          columns={columns()}
          data={data}
          selectableRows
          highlightOnHover
          defaultSortField="name"
          actions={actions}
          contextActions={contextActions(this.deleteAll)}
          sortIcon={sortIcon}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectProps}
          onRowSelected={this.handleChange}
          clearSelectedRows={toggleCleared}
          onRowClicked={this.handleRowClicked}
          pagination
        />
      </Card>
    );
  }
}

storiesOf('UI Libraries', module)
  .add('react-md', () => <MaterialTable />);

  export default MaterialTable;