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
import {
  getData,
  schemaRecoder,
  schemaParcel,
  schemaTaxAssessor,
  schemaOwnerUnmask,
  schemaGeography,
  usa as schemaUsa
} from '../../services';
import LandTab from '../../Components/LandTab';
import tabsData from './tabsData';
import { Pagination, Stack, Typography } from '@mui/material';


export default function BasicGrid() {
  const [parcel, setParcel] = useState('');
  const [parcels, setParcels] = useState([]);
  const [submenu, setSubmenu] = useState('recorder');
  const [principalMenu, setPrincipalMenu] = useState('');
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
        setPrincipalMenu('recorder');
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

  const handleChange = async (newValue) => {
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
      case 'taxAssessor':
        getCherreData(schemaTaxAssessor.taxAssessor(parcel.tax_assessor_id, 1000), 'tax_assessor')
        break;
      case 'taxAssessorBlock':
        getCherreData(
          schemaTaxAssessor.taxAssessorBlock(parcel.tax_assessor_id, 1000),
          'tax_assessor_block'
        )
        break;
      case 'taxAssessorLot':
        getCherreData(
          schemaTaxAssessor.taxAssessorLot(parcel.tax_assessor_id, 1000),
          'tax_assessor_lot'
        )
        break;
      case 'taxAssessorOwner':
        getCherreData(
          schemaTaxAssessor.taxAssessorOwner(parcel.tax_assessor_id, 1000),
          'tax_assessor_owner'
        )
        break;
      case 'ownerUnmaskUsa':
        getCherreData(
          schemaOwnerUnmask.usaMsaBoundary(parcel.tax_assessor_id, 1000),
          'usa_msa_boundary'
        )
        break;
      case 'ownerUnmaskContractInformation':
        getCherreData(
          schemaOwnerUnmask.ownerUnmaskInfo(parcel.tax_assessor_id, 1000),
          'usa_owner_unmask_contact_info'
        )
        break;
      case 'ownerUnmaskEmployee':
        getCherreData(
          schemaOwnerUnmask.usaOwnerUnmaskEmployee(parcel.tax_assessor_id, 1000),
          'usa_owner_unmask_employee'
        )
        break;
      case 'ownerUnmaskCorporation':
        getCherreData(
          schemaOwnerUnmask.ownerUnmaskCorporation(parcel.tax_assessor_id, 1000),
          'usa_owner_unmask_corporation'
        )
        break;
      case 'ownerUnmaskCorporateEmployee':
        getCherreData(
          schemaOwnerUnmask.ownerUnmaskCorporateEmployee(parcel.tax_assessor_id, 1000),
          'usa_owner_unmask_corp_employee'
        )
        break;
      case 'usaBuilding':
        getCherreData(
          schemaUsa.usaBuilding(parcel.assessor_parcel_number, 1000),
          'usa_building'
        )
        break;
      case 'usaLot':
        getCherreData(
          schemaUsa.usaLot(parcel.assessor_parcel_number, 1000),
          'usa_lot'
        )
        break;
      case 'usaUnit':
        getCherreData(
          schemaUsa.usaUnit(parcel.assessor_parcel_number, 1000),
          'usa_unit'
        )
        break;
      case 'usaAvm':
        getCherreData(
          schemaUsa.usaAvm(parcel.tax_assessor_id, 1000),
          'usa_avm'
        )
        break;
      case 'blsEmployment':
        getCherreData(
          schemaUsa.blsEmployment(parcel.tax_assessor_id, 1000),
          'usa_bls_employment'
        )
        break;
      case 'censusPermitSurveyPre':
        getCherreData(
          schemaUsa.censusPermitSurveyPre(parcel.tax_assessor_id, 100),
          'census_permit_survey_pre'
        )
        break;
      case 'censusPermitSurveyPost':
        getCherreData(
          schemaUsa.censusPermitSurveyPost(parcel.tax_assessor_id, 100),
          'census_permit_survey_post'
        )
        break;
      case 'usaSchool':
        getCherreData(
          schemaUsa.usaSchool(parcel.tax_assessor_id, 100),
          'usa_school'
        )
        break;
      case 'usaTaxAssessorHistory':
        getCherreData(
          schemaUsa.usaTaxAssessorHistory(parcel.tax_assessor_id, 100),
          'usa_tax_assessor_history'
        )
        break;
      case 'usaDemographics':
        getCherreData(
          schemaUsa.usaDemographics(parcel.tax_assessor_id, 100),
          'usa_demographics_v2'
        )
        break;
      case 'censusTractBoundaryUsa':
        getCherreData(
          schemaGeography.censusTractBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_census_tract_boundary'
        )
        break;
      case 'countyBoundaryUsa':
        getCherreData(
          schemaGeography.countyBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_county_boundary'
        )
        break;
      case 'stateBoundaryUsa':
        getCherreData(
          schemaGeography.stateBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_state_boundary'
        )
        break;
      case 'msaBoundaryUsa':
        getCherreData(
          schemaGeography.msaBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_msa_boundary'
        )
        break;
      case 'zipBoundaryUsa':
        getCherreData(
          schemaGeography.zipBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_zip_code_boundary'
        )
        break;
      case 'schoolBoundaryUsa':
        getCherreData(
          schemaGeography.schoolBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_school_boundary'
        )
        break;
      case 'neighborhoodBoundaryUsa':
        getCherreData(
          schemaGeography.neighborhoodBoundaryUsa(parcel.tax_assessor_id, 100),
          'usa_neighborhood_boundary'
        )
        break;
      case 'parcelBoundary':
        getCherreData(
          schemaGeography.parcelBoundary(parcel.tax_assessor_id, 100),
          'parcel_boundary'
        )
        break;
      default:
        setTableData([])
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
      const tabs = tabsData(headers, principalMenu, loadingData, tableData)
      setTabsDataValue(tabs)
      handleChange(tabs[0]?.value)
      setPrincipal()
    }
  }, [principalMenu]);
  
  useEffect(() => {
    if (parcel) {
      const tabs = tabsData(headers, principalMenu, loadingData, tableData)
      setTabsDataValue(tabs)
      setPrincipal()
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

  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  const LandPagination = () => {
    return (
      <Stack spacing={2} style={{ margin: 5 }}>
        <Typography>Page: {page}</Typography>
        <Pagination count={tableDataRequest.length} page={page} onChange={handleChangePagination} />
      </Stack>
    )
  }

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
          <LandPagination/>
          <LandTab value={submenu} tabs={tabsDataValue} handleChange={handleChange}/>
        </Grid>
      </Grid>
    </Box>
  );
}