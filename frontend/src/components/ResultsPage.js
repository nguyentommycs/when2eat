import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import AllUsersBlock from "./AllUsersBlock";
function ResultsPage() {
  const navigate= useNavigate();
  const {code} = useParams();
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true);
  const handleGoToRoomButtonPressed=async()=>{
      
      navigate("/room/" + code);
      //then((data)=>console.log(data));

  }


  useEffect(() => {
    async function fetchData() {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },

      };
      const res = await fetch('http://localhost:8000/api/users?code=' + code,requestOptions);
      const data = await res.json();
      console.log(data);
      setData(data)
      setLoading(false);
    }
    fetchData();
  },[]); // Or [] if effect doesn't need props or state
  if (isLoading) {
    return (
      // <div className="App">
      // <Spinner size="xl" color="red.500" />
      // </div>
      <div> loading </div>
    );
  }
  else{
    return (
      <div>
          <Grid item xs={12} align = "center">
              <Typography component="h4" variant="h4">
              Code: {code}
              </Typography>
          </Grid>
          <Grid item xs={12} align = "center">
              <Typography component="h4" variant="h4">
              Results
              </Typography>
          </Grid>
          <Grid item xs={12} align = "center" >
                  <AllUsersBlock data={data}/>
          </Grid>
          <Grid item xs={12} align = "center">
              <Button color = "primary" variant = "contained" onClick={handleGoToRoomButtonPressed}>
                  Go Back to Room
              </Button>
          </Grid>

      </div>
    )
  }
}

export default ResultsPage