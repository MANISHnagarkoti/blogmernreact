import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ list, heading, setSort, value }) {


  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={heading}
          onChange={handleChange}
          disableScrollLock={true}
        >
          {
            list.map((e) => <MenuItem value={e}>{e}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}
