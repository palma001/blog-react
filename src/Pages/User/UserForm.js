import * as React from 'react';
import { Box, Grid, TextField } from '@mui/material';
export default function UserForm (props) {
  const { sendData, data } = props
  const [formulario, setFormulario] = React.useState(data);
  
  const handleChange = (event) => {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
    sendData(formulario)
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField id="outlined-basic" name="name" label="Name" variant="outlined" onChange={handleChange}/>
          </Grid>
          <Grid item xs={6}>
            <TextField id="outlined-basic" name="value" label="Value" variant="outlined" onChange={handleChange}/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}