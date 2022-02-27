import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
//import DateAdapter from '@mui/lab/AdapterDateFns';
import AddUserForm from "./AddUserForm";
function RoomPage() {
    const {code} = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleGoToResultsButtonPressed=async()=>{
        
        navigate("/results/" + code);
    }
    const handleAddUserButtonPressed=async()=>{
        console.log(this.refs.myField.getValue())
        navigate("/results/" + code );
    }
    useEffect(() => {
        async function fetchData() {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            },
    
          };
          const res = await fetch('http://localhost:8000/api/rooms?code=' + code,requestOptions);
          const data = await res.json();
          console.log(data);
          setData(data)
          setLoading(false);
        }
        fetchData();
      },[]);

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
                    You've been invited to {data.meal} on {data.date}!
                    </Typography>
                    Please input your name, available times, and desired cuisine below.
                </Grid>

                <Grid item xs={12} align = "center">
                    <Typography component="h4" variant="h4">
                    Add a new user:
                    </Typography>
                </Grid>
                <Grid item xs={12} align = "center" >
                    <AddUserForm roomCode={code}/>
                </Grid>
                <Grid item xs={12} align = "center">
                    <Button color = "primary" variant = "contained" onClick={handleGoToResultsButtonPressed}>
                        See Results
                    </Button>
                </Grid>

            </div>
        )
    }
}

export default RoomPage