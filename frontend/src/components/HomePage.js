import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Redirect,useParams,useNavigate, useInRouterContext} from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel, } from '@material-ui/core';
import DatePicker from 'react-date-picker';



function HomePage() {
    
    const [date,onDateChange] = useState(new Date());
    var data;
    const navigate =useNavigate();
    const addRoom = async () => {
        const start_date_str=date.toJSON();
        date.setDate(date.getDate()+7);
        const end_date_str=date.toJSON();
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
                start_date: start_date_str,
                end_date: end_date_str
            }),
        };
        const res = await fetch('http://localhost:8000/api/rooms/',requestOptions);
        data = await res.json();
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
                <DatePicker onChange = {onDateChange} value = {date} />
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