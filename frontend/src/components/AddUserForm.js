import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel,Select,MenuItem, InputLabel } from '@material-ui/core';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

export default class AddUserForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', cuisine: 'No Preference',time:null};
      this.code = props.roomCode;
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCuisineChange = this.handleCuisineChange.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      
    }
  
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleCuisineChange(event) {
        this.setState({cuisine: event.target.value});
    }
    handleTimeChange(value){
        this.setState({time: value});
    }
  
    handleSubmit=async(event)=>{
        if(this.state.name==''){
            alert("Please input your name");
        }
        else if (this.state.time != null && this.state.time[0]!=null && this.state.time[1]!=null)
        {
            
            const requestOptions = {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.code,
                    name: this.state.name,
                    cuisine: this.state.cuisine,
                    start_time: this.state.time[0],
                    end_time: this.state.time[1]
                }),
            };

            const res = await fetch('http://localhost:8000/api/users/',requestOptions);
            const data = await res.json();
            alert(this.state.name + " has been added! Click see results to see everyone else.");
            event.preventDefault();
        }
        else
        {  
            alert("Please input the time when you are available");
        }
    }
  
    render() {
      return (
            <div>
            <Grid item xs={12} align = "center">
                <TextField id="outlined-basic" label="Name"  variant="outlined" /*value={this.state.name}*/ onChange={this.handleNameChange}/>
            </Grid>
            <Grid item xs={12} align = "center">

                <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.cuisine}
                        label="Cuisine"
                        onChange={this.handleCuisineChange}
                    >
                        <MenuItem value={'No Preference'}>No Preference</MenuItem>
                        <MenuItem value={'American'}>American</MenuItem>
                        <MenuItem value={'Korean'}>Korean</MenuItem>
                        <MenuItem value={'Chinese'}>Chinese</MenuItem>
                        <MenuItem value={'Indian'}>Indian</MenuItem>
                    </Select>

            </Grid>


            <TimeRangePicker onChange={this.handleTimeChange} value={this.state.time} />


            <Grid item xs={12} align = "center">
                <Button color = "primary" variant = "contained" onClick={this.handleSubmit}>
                    Add User
                </Button>
            </Grid>
            </div>
      );
    }
  }
