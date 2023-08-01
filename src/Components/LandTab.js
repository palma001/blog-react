import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel';
import { Paper, Tabs, Typography, Box, Tab } from '@mui/material';
import Tooltip from '@mui/joy/Tooltip';


export default function LandTab ({ tabs, handleChange, value, loadingData }) {

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
                    >
                      {
                        tabs.map(tab => (
                          <Tab
                            wrapped
                            value={tab.value}
                            key={tab.value}
                            disabled={tab.missing || loadingData}
                            label={
                              <Tooltip
                                title={tab.description}
                                arrow
                                size="lg"
                              >
                                <span>
                                  { tab.label }
                                </span>
                              </Tooltip>
                            }
                            onClick={() => handleChangeTab(tab.value, tab)}
                          />
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