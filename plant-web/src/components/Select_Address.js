import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { Button, TextField, InputAdornment} from '@material-ui/core';
import Axios from 'axios';
import Cookies, { set } from 'js-cookie';
import { LOCALHOST } from '../host.js'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, city, theme) {
  return {
    fontWeight:
      city.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
      Axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/json/all.json')
      .then(res => {
        setData(res.data);
      })
  },[,])


  let citys = [];
  let districts = [];
  let wards = [];

  data.map(value => {
    citys.push(value.name);
  })

  const [street, setStreet] = useState('');

  const [city, setcity] = useState('');

  const [district, setdistrict] = useState('');

  const [ward, setward] = useState('');
  
  const [dataDistrict, setDataDistrict] = useState([]);

  const [dataWard, setDataWard] = useState([]);

  const [fullAddress, setFullAddress ] = useState('');

  const handleChangeCity = (event) => {
    setDataWard([]);
    setdistrict('');
    setward('');
    setFullAddress(event.target.value);
    setcity(event.target.value);
    data.map(value => {
      if(event.target.value == value.name) {
        value.huyen.map(district => {
          districts.push(district.name)
        })
      }
    })
    setDataDistrict(districts);
  };

  const handleChangeDistrict = (event) => {
    setward('');
    setdistrict(event.target.value);
    setFullAddress(event.target.value + ', ' +city)
    data.map(value => {
      if(city == value.name) {
        value.huyen.map(huyen => {
          if(huyen.name == event.target.value) {
            huyen.xa.map(xa => {
              wards.push(xa.name);
            })
          }
        })
      }
    })
    setDataWard(wards);
  };

  const handleChangeWard = (event) => {
    setward(event.target.value);
    setFullAddress(event.target.value + ', ' + district + ', ' +city)
  };

  const onChange = (event) => {
    setStreet(event.target.value)
  }

  const btnAddAdress = (props) => {
    const address = street + ', ' + ward + ', ' + district + ', ' + city;
    Axios.post(LOCALHOST+'/users/add-address', {id: Cookies.get('id'), address: address})
    .then(() => {
      window.location.href = '/user/manage=address  ';
    })
  }
  console.log(data);
  return (
    <div className="select-component">
        <div className="city-selector">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">City / Province</InputLabel>
                <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                value={city}
                onChange={handleChangeCity}
                input={<Input />}
                MenuProps={MenuProps}
                >
                {citys.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, city, theme)}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>

        <div className="city-selector">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">District</InputLabel>
                <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                value={district}
                onChange={handleChangeDistrict}
                input={<Input />}
                MenuProps={MenuProps}
                >
                {dataDistrict.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, city, theme)}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>

        <div className="city-selector">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Ward</InputLabel>
                <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                value={ward}
                onChange={handleChangeWard}
                input={<Input />}
                MenuProps={MenuProps}
                >
                {dataWard.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, city, theme)}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
        <div className="street-selector">
          <TextField id="standard-basic" label="Street" 
              name="street"
              defaultValue={street}
              onChange={onChange}
          />
        </div>

        <div className="my-selected-address">
          <TextField id="standard-basic" label="My Address" disabled={true} 
              name="myAddress"
              value={fullAddress}
              onChange={(text) => setFullAddress(text)}
          />
        </div>

        <div className="button--add-address">
          <Button variant="contained" color="primary" onClick={ btnAddAdress }>
            Add Address
          </Button>
        </div>
    </div>
  );
}