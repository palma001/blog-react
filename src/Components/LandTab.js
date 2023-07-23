import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList'
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs, Typography } from '@mui/material';

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
                    <Tabs
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      onChange={handleChangeTab}
                      value={value}
                    >
                      {
                        tabs.map(tab => (
                          <Tab
                            wrapped
                            label={tab.label}
                            value={tab.value}
                            key={tab.value}
                          />
                        ))
                      }
                    </Tabs>
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