import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Redirect,useParams,useNavigate, useInRouterContext} from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel, InputLabel,Select,MenuItem} from '@material-ui/core';
import DatePicker from 'react-date-picker';



function HomePage() {
    
    const [date,onDateChange] = useState(new Date());
    const [meal,setMeal] = useState("Dinner");
    const handleMealChange= (event)=> {setMeal(event.target.value);
    }
    var data;
    const navigate =useNavigate();
    const addRoom = async () => {
        console.log(meal);
        const date_str=date.toJSON();
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
                date: date_str,
                meal: meal
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
                <Grid item xs={12} align = "center">

                <InputLabel id="demo-simple-select-label">Meal Time</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Meal Time"
                        onChange={handleMealChange}
                        value = {meal}
                    >
                        <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                        <MenuItem value={"Lunch"}>Lunch</MenuItem>
                        <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    </Select>

            </Grid>
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