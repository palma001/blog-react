import { Box, CircularProgress } from "@mui/material"
import LandTable from "../../Components/LandTable"
export default function tabsData (headers, tabs, loadingData, tableData) {
  const TableComponent = ({ data }) => {
    return (
      <>
        {loadingData && (
            <Box sx={{ display: 'flex', alignContent: 'center', width: '100%', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )
        }
        {!loadingData && (
          <LandTable data={data} headers={headers}/>
        )}
      </>
    )
  }
  return [
    {
      label: 'Recorder',
      value: 'recorder',
      menu: 'recorder',
      component: <TableComponent data={tableData}/>
    },
    {
      label: 'Recorder Grantee',
      value: 'recorderGrantee',
      menu: 'recorder',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder Grantor',
      value: 'recorderGrantor',
      menu: 'recorder',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder Legal Description',
      value: 'recorderLegalDescription',
      menu: 'recorder',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder Mortgage',
      value: 'recorderMortgage',
      menu: 'recorder',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor',
      value: 'taxAssessor',
      menu: 'taxAssessor',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor Block',
      value: 'taxAssessorBlock',
      menu: 'taxAssessor',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor Lot',
      value: 'taxAssessorLot',
      menu: 'taxAssessor',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor Owner',
      value: 'taxAssessorOwner',
      menu: 'taxAssessor',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Owner Unmask',
      value: 'ownerUnmask',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Employee',
      value: 'ownerUnmaskEmployee',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Corporation',
      value: 'ownerUnmaskCorporation',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Contract Information',
      value: 'ownerUnmaskContractInformation',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask - Corporate Employee',
      value: 'ownerUnmaskCorporateEmployee',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Owner Unmask',
      value: 'ownerUnmaskUsa',
      menu: 'ownerUnmask',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Census Tract Boundary',
      value: 'censusTractBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa County Boundary',
      value: 'countyBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa State Boundary',
      value: 'stateBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa MSA Boundary',
      value: 'msaBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Zip Boundary',
      value: 'zipBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Schoool Boundary',
      value: 'schoolBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Usa Neighborhood Boundary',
      value: 'neighborhoodBoundaryUsa',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Parcel Boundary',
      value: 'parcelBoundary',
      menu: 'geography',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Tax Assessor',
      value: 'taxAssessorLookups',
      menu: 'lookups',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Demographics',
      value: 'demographicsLookups',
      menu: 'lookups',
      component: <TableComponent data={tableData} />
    },
    {
      label: 'Recorder',
      value: 'recorderLookups',
      menu: 'lookups',
      component: <TableComponent data={tableData} />
    },
  ].filter((item) => item.menu === tabs)
}