/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Alert, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  getData,
  schemaRecoder,
  schemaParcel
} from '../../services';
import LandTab from '../../Components/LandTab';
import tabsData from './tabsData';
import { Pagination, Stack, Typography, Container } from '@mui/material';


export default function BasicGrid() {
  const [parcel, setParcel] = useState('');
  const [parcels, setParcels] = useState([]);
  const [submenu, setSubmenu] = useState('recorder');
  const [principalMenu, setPrincipalMenu] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableDataRequest, setTableDataRequest] = useState([]);
  const [tabsDataValue, setTabsDataValue] = useState([]);
  const [page, setPage] = useState(1);
  const [principalData, setPrincipalData] = useState(null);
  
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
    getData(schemaParcel.parcel(100))
      .then(({ data }) => {
        setParcels(data.parcel_boundary);
        setParcel(data.parcel_boundary[0]);
        setPrincipalMenu(buttons[0]);
      })
      .catch((error) => {
        console.log(error);
        setParcel('')
      });
  }
  /**
   * Convert text to capitalize
   * @param {String} text text to convert
   * @returns {String} text converted
   */
  function textConvert(text) {
    text = text.replace(/_/g, ' ');
    let words = text.split(' ');
    words = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(' ');
  }

  const convertData = (item) => {
    const recorder = []
    for (const key in item) {
      if (typeof item[key] !== 'object' || item[key] === null) {
        recorder.push({
          name: textConvert(key),
          value: item[key]
        });
      }
    }
    return recorder
  }
  /**
   * Get data Cherre
   * @param {String} query schema of cherre query graphql
   * @param {String} queryName name query
   */
  const getCherreData = async (query, queryName) => {
    try {
      setLoadingData(true);
      setTableData([])
      const { data } = await getData(query)
      setLoadingData(false);
      setTableDataRequest(data[queryName]);
      setTableData(convertData(data[queryName][0]))
    } catch (error) {
      console.log(error);
      setTableData([])
      setLoadingData(false);
    }
  }
  const setPrincipal = () => {
    const currentSubmenu = tabsDataValue.find(tab => tab.value === submenu)
    if (currentSubmenu?.principal) {
      setPrincipalData(tableDataRequest[page - 1])
    }
  }
  /**
   * Set table data
   */
  useEffect(() => {
    setTableData(convertData(tableDataRequest[page - 1]))
    setPrincipal()
  }, [page])

  const handleChange = async (newValue, dataTab) => {
    setSubmenu(newValue)
    switch (newValue) {
      case 'recorder':
        setPrincipalData(tableDataRequest[page - 1])
        getCherreData(schemaRecoder.recoder(parcel.tax_assessor_id, 1000), 'recorder')
        break;
      case 'recorderGrantee':
        getCherreData(schemaRecoder.recoderGrantee(principalData?.recorder_id, 1000), 'recorder_grantee')
        break;
      case 'recorderGrantor':
        getCherreData(schemaRecoder.recoderGrantor(principalData?.recorder_id, 1000), 'recorder_grantor')
        break;
      case 'recorderLegalDescription':
        getCherreData(schemaRecoder.recorderLegalDescription(principalData?.recorder_id, 1000), 'recorder_legal_description')
        break;
      case 'recorderMortgage':
        getCherreData(schemaRecoder.recorderMortgage(principalData?.recorder_id, 1000), 'recorder_mortgage')
        break;
      default:
        if (dataTab?.nameSchema) {
          getCherreData(dataTab.schema(parcel.tax_assessor_id), dataTab?.nameSchema)
        } else {
          setTableData([])
        }
        setLoadingData(false);
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
      const tabs = tabsData(headers, principalMenu?.key, loadingData, tableData)
      setTabsDataValue(tabs)
      handleChange(tabs[0]?.value, tabs[0])
      setPrincipal()
    }
  }, [principalMenu]);
  
  useEffect(() => {
    if (parcel) {
      const tabs = tabsData(headers, principalMenu?.key, loadingData, tableData)
      setTabsDataValue(tabs)
      setPrincipal()
    }
  }, [tableData]);

  const buttons = [
    {
      key: 'recorder',
      label: 'Records',
      description: 'Property related data from registered documents including transactions and mortgages nationwide.'
    },
    {
      key: 'taxAssessor',
      label: 'Tax Data',
      description: 'Tax data related to properties. Includes information related to parcel characteristics, amenities, deeds, zoning, valuation, taxation, and ownership.'
    },
    {
      key: 'ownerUnmask',
      label: 'Owner',
      description: 'Proprietary development by Cherre to uncover true owners of properties, especially if there an LLC registered on the tax record.'
    },
    {
      key: 'usa',
      label: 'Buildings',
      description: 'The USA dataset consists characteristics at a lot, building and unit level. Also, layering demographic data and school information.'
    },
    {
      key: 'geography',
      label: 'Boundary',
      description: 'Full-resolution boundary files, derived from TIGER/Line Shapefiles, the fully-supported, core geographic products from the US Census Bureau. Geographic boundary information for zip, school, neighbourhood and gor each given parcel nationwide'
    }
  ]

  const Buttons = ({ buttons }) => buttons.map((button) => (
    <Button
      color="success"
      variant="contained"
      size="small"
      key={button.key}
      style={{
        borderRadius: '4px',
        background: '#2E7D32',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)',
      }}
      disabled={principalMenu?.key === button.key}
      onClick={() => handlerPrincipalMenu(button)}
    >
      { button.label }
    </Button>
  ))

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const LandPagination = () => {
    return (
      <Stack spacing={2} style={{ margin: 5 }}>
        <Pagination count={tableDataRequest.length} page={page} onChange={handleChangePagination} />
      </Stack>
    )
  }

  return (
    <Box>
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
      <Container
        maxWidth="xl"
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          marginTop: '10px',
          position: 'relative',
          padding: '20px 60px'
        }}
      >
        <Box style={{
          transform: 'rotate(-90deg)',
          position: 'absolute',
          left: -214,
          top: 300
        }}>
          <ButtonGroup>
            <Buttons buttons={buttons}/>
          </ButtonGroup>
        </Box>
        <Box style={{ marginTop: '10px' }}>
          <Typography variant="h4">
            BUILDINGS
          </Typography>
          <Typography variant="subtitle1">
            This dataset character at a lot and building level. Also, layering demographic data and school information.
          </Typography>
        </Box>
        <Grid
          container
          style={{ marginTop: '10px' }}
          justifyContent="center"
          direction="row"
          alignItems="center"
        >
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <LandTab value={submenu} tabs={tabsDataValue} handleChange={handleChange}/>
          </Grid>
         <Grid xs="auto">
            <LandPagination/>
         </Grid>
        </Grid>
        <Box style={{ marginTop: '5px' }}>
          <Alert severity="info">
            <Box component='span' style={{ fontWeight: 'bold' }}>
              Description
            </Box> 
            <br/>
            <br/>
            {principalMenu?.description}
          </Alert>
        </Box>
      </Container>
    </Box>
  );
}