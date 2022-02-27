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
      const res = await fetch('http://localhost:8000/api/besttime?code=' + code,requestOptions);
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
        <Grid container spacing = {2}> 
          <Grid item xs={6} align = "center">
            <Grid container spacing = {1}> 
              <Grid item xs={12} align = "center">
                  <Typography component="h4" variant="h4">
                  Code: {code}
                  </Typography>
                  <Typography component="h4" variant="h4">
                  Suggested Time: {data.best_time} 
                  </Typography>
                  <Typography component="h4" variant="h4">
                  Suggested Cuisine: {data.best_cuisine} 
                  </Typography>
              </Grid>
              <Grid item xs={12} align = "center">
                <Button color = "primary" variant = "contained" onClick={handleGoToRoomButtonPressed}>
                    Go back and add more users
                </Button>
              </Grid>
              <Grid item xs={12} align = "center">
                  <Button color = "secondary" variant = "contained" onClick={event =>  window.open('https://www.yelp.com/search?find_desc='+data.best_cuisine)}>
                      See Yelp Reccomendations in your Area
                  </Button>
                  
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} align = "center">
            <Grid item xs={12} align = "center">
                <Typography component="h4" variant="h4">
                People that can make it
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center" >
                    <AllUsersBlock data={data.available_users}/>
            </Grid>
            <Grid item xs={12} align = "center">
                <Typography component="h4" variant="h4">
                People that can't make it
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center" >
                    <AllUsersBlock data={data.unavailable_users}/>
            </Grid>
          </Grid>
        </Grid>


          

      </div>
    )
  }
}

export default ResultsPage