import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Redirect,useParams,useNavigate, useInRouterContext} from 'react-router-dom';
import { Button, Grid, Typography, TextField, Paper, InputLabel,Select,MenuItem,makeStyles, ThemeProvider} from '@material-ui/core';
import DatePicker from 'react-date-picker';
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000',
    },
  },
});


function HomePage() {
    
    const [date,onDateChange] = useState(new Date());
    const [meal,setMeal] = useState("Dinner");
    const [code,setCode]=useState("")
    const handleMealChange= (event)=> {setMeal(event.target.value);
    }
    const handleCodeChange=(event) =>{
        setCode(event.target.value);
    }
    var data;
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
    const navigate =useNavigate();
    const classes = useStyles();
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
    const joinRoom =()=>{
        navigate("/room/"+code);
    }
    return (
        <div
        style ={{
            paddingTop: '50px'
        }}
        >
            <Grid container spacing = {2}>
                            
                <Grid item xs={6} align = "center">
                        <h1 style={{color: 'white', fontSize:'60px'}}>When2Eat</h1>
                        <Grid item xs={10} align = "left">
                        <body style={{color: 'white',fontSize:'20px'}}>
                        Do you need help deciding when to get dinner with your friends? Do you always spend hours debating on what cuisine to eat? Look no further, When2Eat will solve all those issues!
                        To get started: <b>choose a meal time, pick a date, and click create a room!</b>
                        </body>
                    </Grid>
                </Grid>
                
                <Grid item xs={6} align = "center" >  
                    <Paper className = {classes.paperDark} align={"center"} elevation={20}>
                        <Grid container spacing = {2}>
                            <Grid item xs={12} align = "center">
                                <Typography component="span" variant="h4">
                                Create a New Room
                                </Typography>
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
                            <Grid item xs={12} align = "center">
                                <InputLabel id="demo-simple-select-label">Date</InputLabel>
                                <DatePicker onChange = {onDateChange} value = {date} />
                            </Grid>

                            <Grid item xs={12} align = "center">
                                <Button color = "primary" variant = "contained" onClick={addRoom}>
                                Create a room
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <div         
                    style ={{
                        paddingTop: '50px'
                    }}>
                        <Paper className = {classes.paperLight} align={"center"} elevation={20} >
                            <Grid container spacing = {2}>
                                <Grid item xs={12} align = "center" > 
                                    <Typography component="span" variant="h4">
                                    Join an Existing Room
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align = "center">
                            <       TextField id="outlined-basic" label="Code"  variant="outlined" onChange={handleCodeChange}/>
                                </Grid>
                                <Grid item xs={12} align = "center">
                                    <Button color = "secondary" variant = "contained" onClick={joinRoom}>
                                    Join room
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                </Grid>
            </Grid>
        </div>
  )
}

export default HomePage