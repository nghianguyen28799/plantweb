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

function Editable() {
    const { useState } = React;
    
    useEffect(() => {
      getData();
    },[])
 
    const [columns, setColumns] = useState([
      { title: 'Id', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'Phone', field: 'phone'},
      { title: 'Address', field: 'address'},
      { title: 'Product', field: 'product',
        render: rowData => {
        return  rowData.productImage.map((value, index) => 
            <div style={{ width: 300, float: "left"}}>
                <div style={{ width: 80, float: "left" }}>
                  <img src={ require('../../images/products/'+value) } style={{ width: '100%' }} />
                </div>
                <div style={{ width: 210 , float: "left", "padding-left": "5px" }}>                 
                  <h5> {rowData.productName[index] } </h5>
                  <p>{ rowData.productSize[index] }</p>
                  <p>x { rowData.productPrice[index] }</p>
                </div>
            </div>
          )
        }
      },
      { title: 'Shipping Fee', field: 'shippingfee'},
      { title: 'Payment', field: 'payment' },
      { title: 'Time Order', field: 'timeorder' },
      { title: 'Order Status', field: 'orderstatus' },
    ]);
  
    const [data, setData] = useState([
    
    ]);

    const getData = () => {
      Axios.get('http://localhost:9000/order')
      .then(res => {
        var array = [];

        for(let i in res.data) {  
          const dt = {
            id: res.data[i]._id, 
            name: res.data[i].userName, 
            phone: res.data[i].userPhone,
            address: res.data[i].userAddress, 
            productName: res.data[i].productName,
            productPrice: res.data[i].productPrice,
            productImage: res.data[i].productImage,
            productSize: res.data[i].productSize,
            shippingfee: res.data[i].shippingFee,
            payment: res.data[i].productPriceTotal,
            timeorder: res.data[i].currentTime,
            orderstatus: res.data[i].orderStatus
          }
          array.push(dt);
        }
          setData(array);
      })
    }

    return (
      <MaterialTable
      icons={tableIcons}
      
        title="Order Page"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
  
  export default Editable