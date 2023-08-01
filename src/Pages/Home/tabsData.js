import LandTable from "../../Components/LandTable"
import { schemaGeography, schemaOwnerUnmask, schemaRecoder, schemaTaxAssessor, usa as schemaUsa } from "../../services"
export default function tabsData (headers, tabs, loadingData, tableData) {
  /**
   * Component to render table
   * @param {Object} props props to render table 
   * @returns {JSX.Element} table component
   */
  const TableComponent = ({ data }) => {
    return <LandTable data={data} headers={headers} loadingData={loadingData}/>
  }

  return [
    {
      label: 'Recorder',
      value: 'recorder',
      menu: 'recorder',
      principal: true,
      schema: (param) => schemaRecoder.recoder(param, 1000),
      nameSchema: 'recoder',
      description: 'Documents, foreclosures, tax, legal, purchase details that were recorded and relate to a property.',
      component: <TableComponent data={tableData}/>
    },
    {
      label: 'Recorder Grantee',
      value: 'recorderGrantee',
      menu: 'recorder',
      schema: (param) => schemaRecoder.recoderGrantee(param, 1000),
      nameSchema: 'recoder_grantee',
      description: 'Buyer information including name, address, and ownership details.',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder Grantor',
      value: 'recorderGrantor',
      menu: 'recorder',
      schema: (param) => schemaRecoder.recoderGrantor(param, 1000),
      nameSchema: 'recoder_grantor',
      description: 'Seller information including name, address, and ownership details.',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder Legal Description',
      value: 'recorderLegalDescription',
      menu: 'recorder',
      schema: (param) => schemaRecoder.recorderLegalDescription(param, 1000),
      nameSchema: 'recoder_legal_description',
      description: 'Property legal description provided by the county',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder Mortgage',
      value: 'recorderMortgage',
      menu: 'recorder',
      schema: (param) => schemaRecoder.recorderMortgage(param, 1000),
      nameSchema: 'recoder_mortgage',
      description: 'Loan amount, interest rate, and lender details',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor',
      value: 'taxAssessor',
      menu: 'taxAssessor',
      principal: true,
      schema: (param) => schemaTaxAssessor.taxAssessor(param, 1000),
      nameSchema: 'tax_assessor',
      description: 'Tax related fields - property characteristics, amenities, deeds, zoning, valuation, taxation and identifiers',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor Block',
      value: 'taxAssessorBlock',
      menu: 'taxAssessor',
      schema: (param) => schemaTaxAssessor.taxAssessorBlock(param, 1000),
      nameSchema: 'tax_assessor_block',
      description: 'Associates a block number to the tax assessor record',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor Lot',
      value: 'taxAssessorLot',
      menu: 'taxAssessor',
      schema: (param) => schemaTaxAssessor.taxAssessorLot(param, 1000),
      nameSchema: 'tax_assessor_lot',
      description: 'Associates a lot number to the tax assessor record',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor Owner',
      value: 'taxAssessorOwner',
      menu: 'taxAssessor',
      schema: (param) => schemaTaxAssessor.taxAssessorOwner(param, 1000),
      nameSchema: 'tax_assessor_owner',
      description: 'Property ownership with relation to name or company',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask',
      value: 'ownerUnmaskUsa',
      menu: 'ownerUnmask',
      schema: (param) => schemaOwnerUnmask.usaMsaBoundary(param, 1000),
      nameSchema: 'usa_msa_boundary',
      description: 'Including owners name, address and phone number',
      principal: true,
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Employee',
      value: 'ownerUnmaskEmployee',
      schema: (param) => schemaOwnerUnmask.usaOwnerUnmaskEmployee(param, 1000),
      nameSchema: 'usa_owner_unmask_employee',
      description: 'Employee information for corporate unmasked owners',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Corporation',
      value: 'ownerUnmaskCorporation',
      menu: 'ownerUnmask',
      schema: (param) => schemaOwnerUnmask.ownerUnmaskCorporation(param, 1000),
      nameSchema: 'usa_owner_unmask_corporation',
      description: 'Corporate information for corporate unmasked owners',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Contact Information',
      value: 'ownerUnmaskContractInformation',
      menu: 'ownerUnmask',
      schema: (param) => schemaOwnerUnmask.ownerUnmaskInfo(param, 1000),
      nameSchema: 'usa_owner_unmask_contact_info',
      description: 'Contact information for unmasked owners',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Corporate Employee',
      value: 'ownerUnmaskCorporateEmployee',
      menu: 'ownerUnmask',
      schema: (param) => schemaOwnerUnmask.ownerUnmaskCorporateEmployee(param, 1000),
      nameSchema: 'usa_owner_unmask_corp_employee',
      description: 'Corporate employee information for unmasked owners',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Census Tract Boundary',
      value: 'censusTractBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.censusTractBoundaryUsa(param, 1000),
      nameSchema: 'usa_census_tract_boundary',
      description: 'Cencus tract boundary',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa County Boundary',
      value: 'countyBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.countyBoundaryUsa(param, 1000),
      nameSchema: 'usa_county_boundary',
      description: 'Census county boundary',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa State Boundary',
      value: 'stateBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.stateBoundaryUsa(param, 1000),
      nameSchema: 'usa_state_boundary',
      description: 'Census state boundary',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa MSA Boundary',
      value: 'msaBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.msaBoundaryUsa(param, 1000),
      nameSchema: 'usa_msa_boundary',
      description: 'Census core-based statistical area boundary',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Zip Boundary',
      value: 'zipBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.zipBoundaryUsa(param, 1000),
      nameSchema: 'usa_zip_code_boundary',
      description: 'USA postal code boundary',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Schoool Boundary',
      value: 'schoolBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.schoolBoundaryUsa(param, 1000),
      nameSchema: 'usa_school_boundary',
      description: 'Geographic extent served by a local school for the purpose of student assignments.',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Neighborhood Boundary',
      value: 'neighborhoodBoundaryUsa',
      menu: 'geography',
      schema: (param) => schemaGeography.neighborhoodBoundaryUsa(param, 1000),
      nameSchema: 'usa_neighborhood_boundary',
      description: 'Nationwide neighborhood geometry data',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Parcel Boundary',
      value: 'parcelBoundary',
      menu: 'geography',
      schema: (param) => schemaGeography.parcelBoundary(param, 1000),
      nameSchema: 'parcel_boundary',
      description: 'Parcel identifier, location and geospacial boundaries',
      component: <TableComponent data={tableData} />
    },
    // {
    //   label: 'Tax Assessor',
    //   value: 'taxAssessorLookups',
    //   menu: 'lookups',
    //   component: <TableComponent data={tableData} />
    // },
    // {
    //   label: 'Demographics',
    //   value: 'demographicsLookups',
    //   menu: 'lookups',
    //   component: <TableComponent data={tableData} />
    // },
    // {
    //   label: 'Recorder',
    //   value: 'recorderLookups',
    //   menu: 'lookups',
    //   component: <TableComponent data={tableData} />
    // },
    // {
    //   label: 'USA Address',
    //   value: 'usaAddress',
    //   menu: 'usa',
    //   component: <TableComponent data={tableData} />
    // },
    {
      label: 'USA Building',
      value: 'usaBuilding',
      menu: 'usa',
      schema: (param) => schemaUsa.usaBuilding(param, 1000),
      nameSchema: 'usa_building',
      description: 'Building data nationwide including characteristics, address, footprint and amenities',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'USA Lot',
      value: 'usaLot',
      menu: 'usa',
      schema: (param) => schemaUsa.usaLot(param, 1000),
      nameSchema: 'usa_lot',
      description: 'Lot data nationwide including size, shape, construction, address and geo classifications (FIPS, Census, etc)',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'USA Unit',
      value: 'usaUnit',
      menu: 'usa',
      schema: (param) => schemaUsa.usaUnit(param, 1000),
      nameSchema: 'usa_unit',
      description: 'Unit data nationwide including characteristics, address, amenities',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'USA Safegraph Places',
      value: 'usaSafegraphPlaces',
      menu: 'usa',
      missing: true,
      schema: null,
      nameSchema: null,
      description: 'Building, unit and lot addresses nationwide',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'USA Avm',
      value: 'usaAvm',
      menu: 'usa',
      schema: (param) => schemaUsa.usaAvm(param, 1000),
      nameSchema: 'usa_avm',
      description: 'Automated Valuation Model (AVM) for residential properties, consisting valuations from 2018 onwards',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Bls Employment',
      value: 'blsEmployment',
      menu: 'usa',
      schema: (param) => schemaUsa.blsEmployment(param, 1000),
      nameSchema: 'usa_bls_employment',
      description: 'Bureau of Labor Statistics (BLS) employment data',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Census Permit Survey Pre',
      value: 'censusPermitSurveyPre',
      menu: 'usa',
      schema: (param) => schemaUsa.censusPermitSurveyPre(param, 1000),
      nameSchema: 'census_permit_survey_pre',
      description: 'Census Permit Survey pre-2004 including building count, reported building and unit counts, unit value',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Census Permit Survey Post',
      value: 'censusPermitSurveyPost',
      schema: (param) => schemaUsa.censusPermitSurveyPost(param, 1000),
      nameSchema: 'census_permit_survey_post',
      description: 'Census Permit Survey post-2004 including building count, reported building and unit counts, unit value',      
      menu: 'usa',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa School',
      value: 'usaSchool',
      menu: 'usa',
      schema: (param) => schemaUsa.usaSchool(param, 1000),
      nameSchema: 'usa_school',
      description: 'School type, student grade span, size, rating, programs and location',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Tax Assessor History',
      value: 'usaTaxAssessorHistory',
      menu: 'usa',
      schema: (param) => schemaUsa.usaTaxAssessorHistory(param, 1000),
      nameSchema: 'usa_tax_assessor_history',
      description: 'Nationwide tax history going back 10 years',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Demographics',
      value: 'usaDemographics',
      menu: 'usa',
      schema: (param) => schemaUsa.usaDemographics(param, 1000),
      nameSchema: 'usa_demographics_v2',
      description: 'Factors population, household, income, education, crime, employment, transportation, weather, and property data',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Rural-Urban Continuum Codes 2013',
      value: 'usaRuralUrbanContinuumCodes2013',
      menu: 'usa',
      missing: true,
      schema: null,
      nameSchema: 'usa_rural_urban_continuum_codes_2013',
      description: 'Distinguishes metropolitan counties by the population size, and nonmetropolitan counties by the population size & adjacency to a metro area',
      component: <TableComponent data={tableData} />
    },
  ].filter((item) => item.menu === tabs)
}