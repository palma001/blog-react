import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel';
import { Paper, Tabs, Typography, Box, Tab, Tooltip } from '@mui/material';


export default function LandTab ({ tabs, handleChange, value }) {

  const handleChangeTab = (newValue, tabData) => {
    handleChange(newValue, tabData)
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
                    <Tabs
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      value={value}
                      indicatorColor="primary"
                    >
                      {
                        tabs.map((tab, index) => (
                          <Tooltip key={tab.value} title={tab.description} placement="top">
                            <Tab
                              wrapped
                              key={tab.value}
                              label={tab.label}
                              value={tab.value}
                              disabled={tab.missing}
                              onClick={() => handleChangeTab(tab.value, tab)}
                            />
                          </Tooltip>
                        ))
                      }
                    </Tabs>
                    {
                      tabs.map(tab => (
                        <TabPanel value={tab.value} key={tab.value} sx={{ padding: '30px', boxShadow: 'inset 0 0 7px rgba(0, 0, 0, 0.5)' }}>
                          <Paper>
                            { tab.component }
                          </Paper>      
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