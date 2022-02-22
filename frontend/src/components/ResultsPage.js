import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

function ResultsPage() {
    const {code} = useParams();
    const navigate= useNavigate();
    const handleGoToRoomButtonPressed=async()=>{
        
        navigate("/room/" + code);
        //then((data)=>console.log(data));

    }
    /*useEffect(() => {
        fetch("/api/get-room" + "?code=" + code)
          .then(res => res.json())
          .then(data => {
            setRoomData({
              ...roomData, 
              //fill in code to set state
            })
          })
      },code) //It renders when the object changes .If we use roomData and/or roomCode then it rerenders infinite times*/
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
        <Grid item xs={12} align = "center">
            <Button color = "primary" variant = "contained" onClick={handleGoToRoomButtonPressed}>
                Go Back to Room
            </Button>
        </Grid>

    </div>
  )
}

export default ResultsPage