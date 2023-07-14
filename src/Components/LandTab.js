import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList'
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';

export default function LandTab ({ tabs, handleChange, value }) {

  const handleChangeTab = (event, newValue) => {
    handleChange(newValue)
  }

  return (
    <>
      {
        value && (
          <TabContext value={value}>
            <Box style={{ textAlign: 'center' }}>
              {
                tabs.length <= 0 && (
                  <Typography variant="h4" gutterBottom>Not Found</Typography>
                )
              }
              {
                tabs.length > 0 && (
                  <>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      {
                        tabs.map(tab => (
                          <Tab label={tab.label} value={tab.value} key={tab.value}/>
                        ))
                      }
                      {/* <Tab label="Recorder" value="recorder"/>
                      <Tab label="Recorder Grantee" value="recorderGrantee" />
                      <Tab label="Recorder Legal Description" value="recorderLegalDescription" />
                      <Tab label="Recorder Mortgage" value="recorderMortgage" /> */}
                    </TabList>
                  {
                    tabs.map(tab => (
                      <TabPanel value={tab.value} key={tab.value}>
                        { tab.component }
                      </TabPanel>
                    ))
                  }
                  </>
                )
              }
            </Box>
          </TabContext>
        )
      }
    </>
  )
}