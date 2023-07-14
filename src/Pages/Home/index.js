/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData, schemaRecoder, schemaParcel } from '../../services';
import LandTab from '../../Components/LandTab';
import tabsData from './tabsData';


export default function BasicGrid() {
  const [parcel, setParcel] = useState('');
  const [parcels, setParcels] = useState([]);
  const [submenu, setSubmenu] = useState('recorder');
  const [principalMenu, setPrincipalMenu] = useState('');
  const [loadingData, setloadingData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tabsDataValue, setTabsDataValue] = useState([]);
  
  const headers = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Value',
      value: 'value'
    }
  ];

  useEffect(() => {
    getParcelData();
  }, []);

  const handleChangeSelected = (event) => {
    setParcel(event.target.value);
  };

  const getParcelData = () => {
    getData(schemaParcel.parcel(4))
      .then(({ data }) => {
        setParcels(data.parcel_boundary);
        setParcel(data.parcel_boundary[0]);
        setPrincipalMenu('recorder');
      })
      .catch((error) => {
        console.log(error);
        setParcel('')
      });
  }

  function textConvert(texto) {
    // Reemplazar guiones bajos por espacios
    texto = texto.replace(/_/g, ' ');
  
    // Dividir el texto en palabras
    let palabras = texto.split(' ');
  
    // Capitalizar la primera letra de cada palabra
    palabras = palabras.map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });
  
    // Unir las palabras en un solo texto
    return palabras.join(' ');
  }

  const convertRecorders = (recorders) => {
    const recorder = []
    recorders.forEach((item) => {
      for (const key in item) {
        if (typeof item[key] !== 'object') {
          recorder.push({
            name: textConvert(key),
            value: item[key]
          });
        }
      }
    })
    return recorder
  }
  
 
  const getRecorderData = async (query, queryName) => {
    try {
      setloadingData(true);
      setTableData([])
      const { data } = await getData(query)
      setloadingData(false);
      setTableData(convertRecorders(data[queryName]));
    } catch (error) {
      console.log(error);
      setloadingData(false);
    }
  }

  const handleChange = async (newValue) => {
    setSubmenu(newValue)
    switch (newValue) {
      case 'recorder':
        console.log('newValue', newValue)
        getRecorderData(schemaRecoder.recoder(parcel.tax_assessor_id, 1000), 'recorder')
        break;
      case 'recorderGrantee':
        console.log('newValue', newValue)
        getRecorderData(schemaRecoder.recoder(parcel.tax_assessor_id, 1000), 'recorder')
        break;
      default:
        setTableData([])
        setloadingData(false);
        break;
    }
  };

  const handlerPrincipalMenu = (key) => {
    setPrincipalMenu(key)
  }
  
  useEffect(() => {
    if (parcel) {
      handleChange(submenu)
    }
  }, [parcel]);
  
  useEffect(() => {
    if (parcel) {
      const tabs = tabsData(headers, principalMenu, loadingData, tableData)
      setTabsDataValue(tabs)
      handleChange(tabs[0]?.value)
    }
  }, [principalMenu]);
  
  useEffect(() => {
    if (parcel) {
      const tabs = tabsData(headers, principalMenu, loadingData, tableData)
      setTabsDataValue(tabs)
    }
  }, [tableData]);

  const buttons = [
    <Button
      color="success"
      variant="contained"
      key="recorder"
      style={{
        borderRadius: '4px',
        background: '#2E7D32',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)',
      }}
      disabled={principalMenu === 'recorder'}
      onClick={() => handlerPrincipalMenu('recorder')}
    >
      Recorder
    </Button>,
    <Button
      color="success"
      variant="contained"
      key="taxAssessor"
      disabled={principalMenu === 'taxAssessor'}
      onClick={() => handlerPrincipalMenu('taxAssessor')}
    >
      Tax Assessor
    </Button>,
    <Button
      color="success"
      variant="contained"
      key="ownerUnmask"
      disabled={principalMenu === 'ownerUnmask'}
      onClick={() => handlerPrincipalMenu('ownerUnmask')}
    >
      Owner Unmask
    </Button>,
    <Button
      color="success"
      variant="contained"
      key="usa"
      disabled={principalMenu === 'usa'}
      onClick={() => handlerPrincipalMenu('usa')}
    >
      Usa
    </Button>,
    <Button
      color="success"
      variant="contained"
      key="geography"
      disabled={principalMenu === 'geography'}
      onClick={() => handlerPrincipalMenu('geography')}
    >
      GeoGraphy
    </Button>,
    <Button
      color="success"
      variant="contained"
      key="lookups"
      disabled={principalMenu === 'lookups'}
      onClick={() => handlerPrincipalMenu('lookups')}
    >
      Lookups
    </Button>
  ];

  return (
    <Box>
      <Grid container>
        <Grid xs={12}>
          <FormControl fullWidth variant="filled">
            <InputLabel shrink id="demo-simple-select-label">Parcels ID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Parcel"
              value={parcel}
              onChange={handleChangeSelected}
            >
              {parcels && parcels.map((parcel) => (
                <MenuItem
                  key={parcel.tax_assessor_id}
                  value={parcel}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    {parcel.assessor_parcel_number}
                  </span> - ({parcel.tax_assessor__tax_assessor_id.one_line_address})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs="auto" sm={2} md={2} lg={2} xl={1} style={{
          marginTop: '10px',
          // display: 'inline-flex',
          // padding: '8px 22px',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center'
        }}>
          <ButtonGroup orientation="vertical">
            {buttons}
          </ButtonGroup>
        </Grid>
        <Grid xs={12} sm={10} md={10} lg={10} xl={11}>
          <LandTab value={submenu} tabs={tabsDataValue} handleChange={handleChange}/>
          {/* {tabsDataValue.length > 0 &&
            (
            )
          } */}
        </Grid>
      </Grid>
    </Box>
  );
}