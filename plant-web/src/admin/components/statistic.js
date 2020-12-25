import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import '../css/Home.css';
import Axios from 'axios';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function Editable(props) {
    const { useState } = React;

    useEffect(() => {
      getData();
    },[props.match.params.page])
 
    const [columns, setColumns] = useState([
      { title: 'Id', field: 'id', editable: 'never'},
      { title: 'Image', field: 'image',
        render: rowData => 
        <img src={require('../../images/products/'+rowData.image)} style={{width: 60, height: 60}}/>
      },
      { title: 'Name', field: 'name', editable: 'never' },
      { title: 'Price', field: 'price', editable: 'never' },
      { title: 'Qty', field: 'qty'},
      { title: 'Total', field: 'total', 
        render: rowData => 
        <p>{rowData.price * rowData.qty}</p>
      },
      {
        title: "Date", field: "date"
      }
    ]);
    const [data, setData] = useState([]);
    // Number(a.slice(a.indexOf("-")+1, a.lastIndexOf("-")))
    const getData = () => {
      const page = Number(props.match.params.page);
      Axios.get('http://localhost:9000/order')
      .then(res => {
        var array = [];
        let newResData = [];
        for(let i in res.data) {
          if(res.data[i].orderStatus === 3) {
            newResData.push(res.data[i])
          }
        }
        console.log(newResData);
        newResData.map(value => {
            const date = Number(value.currentTime.slice(value.currentTime.indexOf("-")+1, value.currentTime.lastIndexOf("-")))
            // (date === page) &&
            if(date === page ) {
              value.productInfo.map((product, index)=> {
                var indexOf = 0; // khong co phan tu nao trong mang
                for(let i in array) {
                    const date_exist =  array[i].date
                  if(array[i].id === product._id && date_exist === date ) {
                    indexOf = i; // co phan tu trong mang
                    }
                }
                if(indexOf === 0) {
                    const dt = {
                        id: product._id,
                        name: product.nameProduct,
                        price: product.price,
                        image: product.image,
                        qty: product.number,
                        date:  Number(value.currentTime.slice(value.currentTime.indexOf("-")+1, value.currentTime.lastIndexOf("-"))),
                    }
                    array.push(dt)
                } else {                    
                    const dt = {
                        id: product._id,
                        name: product.nameProduct,
                        price: product.price,
                        image: product.image,
                        qty: array[indexOf].qty + product.number,
                        date:  Number(value.currentTime.slice(value.currentTime.indexOf("-")+1, value.currentTime.lastIndexOf("-"))),
                    }
                    array[indexOf] = dt;
                }
              })
            } 
        })
        setData(array)
      })
    }

console.log(data);
    
    return (
      <MaterialTable
      icons={tableIcons}
      
        title="Statistic Page"
        columns={columns}
        data={data}
        // editable={{
        //   onRowAdd: newData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         setData([...data, newData]);
                
        //         resolve();
        //       }, 1000)
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataUpdate = [...data];
        //         const index = oldData.tableData.id;
        //         dataUpdate[index] = newData;
        //         setData([...dataUpdate]);
        //           console.log(newData);
        //         resolve();
        //       }, 1000)
        //     }),
        //   onRowDelete: oldData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataDelete = [...data];
        //         const index = oldData.tableData.id;
        //         dataDelete.splice(index, 1);
        //         setData([...dataDelete]);
                
        //         resolve()
        //       }, 1000)
        //     }),
        // }}
      />
    )
  }
  
  export default Editable