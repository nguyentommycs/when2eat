import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel,Select,MenuItem, InputLabel } from '@material-ui/core';

export default class AddUserForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', cuisine: ''};
      this.code = props.roomCode;
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCuisineChange = this.handleCuisineChange.bind(this);
    }
  
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleCuisineChange(event) {
        this.setState({cuisine: event.target.value});
    }
  
    handleSubmit=async(event)=>{
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                code: this.code,
                name: this.state.name,
                cuisine: this.state.cuisine
            }),
        };

        const res = await fetch('http://localhost:8000/api/users/',requestOptions);
        const data = await res.json();
        alert(this.state.name + " has been added! Click see results to see everyone else.");
        event.preventDefault();
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
                    <MenuItem value={'American'}>American</MenuItem>
                    <MenuItem value={'Korean'}>Korean</MenuItem>
                    <MenuItem value={'Chinese'}>Chinese</MenuItem>
                    <MenuItem value={'Indian'}>Indian</MenuItem>
                </Select>

            </Grid>
            <Grid item xs={12} align = "center">
                <Button color = "primary" variant = "contained" onClick={this.handleSubmit}>
                    Add User
                </Button>
            </Grid>
            </div>
      );
    }
  }
