import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import AddUserForm from "./AddUserForm";
function RoomPage() {
    const {code} = useParams();
    const navigate = useNavigate();
    const handleGoToResultsButtonPressed=async()=>{
        
        navigate("/results/" + code);
    }
    const handleAddUserButtonPressed=async()=>{
        console.log(this.refs.myField.getValue())
        navigate("/results/" + code );
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
          console.log("RoomPage");
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
                Send this link to your friends!
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <Button color = "primary" variant = "contained" onClick={handleGoToResultsButtonPressed}>
                    See Results
                </Button>
            </Grid>
            <Grid item xs={12} align = "center">
                <Typography component="h4" variant="h4">
                Add a new user:
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center" >
                <AddUserForm/>
            </Grid>


        </div>
  )
}

export default RoomPage