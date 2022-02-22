import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Redirect,useParams,useNavigate, useInRouterContext} from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';





function HomePage() {
    const navigate =useNavigate();

    const addRoom = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(),
        };
        const res = await fetch('http://localhost:8000/api/rooms/',requestOptions);
        const data = await res.json();
        navigate("/room/"+data.code);
          
      }
    
    return (
        <Grid container spacing = {1}>
                                    
            <Grid item xs={12} align = "center">
                <Typography component="span" variant="h4">
                    When2Eat
                </Typography>
            </Grid>
            
            <Grid item xs={12} align = "center">
                <FormControl component = "fieldset">
                    <FormHelperText>
                        <div align = "center">
                            Push the button to create a new room.
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} align = "center">
                <Button color = "primary" variant = "contained" onClick={addRoom}>
                    Create a room
                </Button>
            </Grid>

        </Grid>
  )
}

export default HomePage