import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, makeStyles, Paper, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
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
    const useStyles = makeStyles({
        paperDark: {
          width: "80%",
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundColor:"#9fa8da"

        },
        paperLight: {
            width: "80%",
            paddingTop: "50px",
            paddingBottom: "50px",
            backgroundColor:"#d1d9ff"
          }
      });

    const classes = useStyles();
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
            <div style ={{
                paddingTop: '50px'
            }}>
            <Grid container spacing = {2}> 
                <Grid item xs={6} align = "center">
                    <h1 style={{color: 'white'}}>
                    Code: {code}
                    <br></br>
                    You've been invited to {data.meal} on {data.date}!
                    </h1>
                    <body style={{color: 'white'}}>
                        <b>Please input your name, available times, and desired cuisine.</b>
                        <br></br>
                        Afterwards, feel free send this code or link to your friends to invite them!
                    </body>
                    <Grid item xs={10} align = "center">
                        <Typography component="h4" variant="body1">

                        </Typography>

                    </Grid>
                </Grid>


                <Grid item xs={6} align = "center" >
                    <Paper className = {classes.paperLight} align={"center"} elevation={20}>
                    <Grid container spacing = {2}> 
                        <Grid item xs={12} align = "center" >
                            <Typography component="h4" variant="h4">
                            Add a new user:
                            </Typography>
                            <AddUserForm roomCode={code}/>
                        </Grid>
                        <Grid item xs={12} align = "center">
                            <Button color = "secondary" variant = "contained" onClick={handleGoToResultsButtonPressed}>
                                See Results
                            </Button>
                        </Grid>
                    </Grid>
                    </Paper>

                </Grid>
                
            </Grid>
            </div>
        )
    }
}

export default RoomPage