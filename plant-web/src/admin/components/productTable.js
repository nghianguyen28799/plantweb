import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import { forwardRef } from 'react';

import ModalEdit from './modalEditProduct';
import ModalAdd from './modalAddProduct';

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
import editIcon from '../../images/pencil.png';
import Axios from 'axios';

import plusIcon from '../../images/plus.svg';

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
    const [modalEdit, setModalEdit] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);

    const [productId, setProductId] = useState('');
    const [product, setProduct] = useState({});

    useEffect(() => {
      getData();
    },[])
 
    const [columns, setColumns] = useState([
      { title: '', field: 'edit',
        render: rowData =>  
        <img src={editIcon} className="editProduct" onClick={()=> {toggleEdit(); setProductId(rowData.id) ;
          Axios.get('http://localhost:9000/product/id='+ rowData.id)
          .then(res => {
            setProduct(res.data[0]);
          })
        }} />
      },
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Images', field: 'image', 
        render: rowData => 
        rowData.image.map(image => (
          <img src={require('../../images/products/'+image)} style={{width: 60, height: 60, margin: 5 }}/>
        )),
        editComponent: props =>
         
        props.value.map(image => (
          
          <input
            type="file"
            // value={image}
            // onChange={e => props.onChange(e.target.value)}
            multiple
          />
        )),
      },
      { title: 'Name', field: 'name'},
      { title: 'Size', field: 'size', 
      render: rowData => 
        rowData.size.map(size => (
          <p>{size}</p>
        ))
      },
      { title: 'Price', field: 'price', 
      render: rowData => 
        rowData.price.map(price => (
          <p>{price}</p>
        ))
      },
      { title: 'Type', field: 'type' },
      { title: 'Qty', field: 'qty' },
      // { title: 'Description', field: 'description'}
    ]);
    const [data, setData] = useState([]);

    const getData = () => {
      Axios.get('http://localhost:9000/product')
      .then(res => {
        var array = [];
        for(let i in res.data) {  
          const dt = {
            id: res.data[i]._id, 
            image: res.data[i].images, 
            name: res.data[i].name, 
            size: res.data[i].sizes,
            price: res.data[i].prices, 
            type: res.data[i].type,
            qty: res.data[i]. number,
          }
          array.push(dt);
        }
          setData(array);
      })
    }

    const toggleEdit = () => {
      setModalEdit(!modalEdit);
    }

    const toggleAdd = () => {
      setModalAdd(!modalAdd);
    }

    return (
      <div>
        <ModalEdit modalProps={modalEdit} toggle={toggleEdit} id={productId} product={product} images={product.images} sizes={product.sizes}/>
        <ModalAdd modalProps={modalAdd} toggle={toggleAdd} id={productId} product={product} images={product.images} sizes={product.sizes}/>
        <div class="div-add-product" onClick={toggleAdd}><img src={plusIcon}/></div>
        <MaterialTable
          icons={tableIcons}
          title="Product Page"
          columns={columns}
          data={data}
          editable={{
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                    Axios.post("http://localhost:9000/product/deleteProduct", {productId: oldData.id})
                    .then(res => {
                      console.log('deleted');
                    }) 
                  resolve()
                }, 1000)
              }),
          }}
        />
      </div>
    )
  }
  
  export default Editable