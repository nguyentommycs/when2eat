import React from 'react'
import SingleUserBlock from "./SingleUserBlock";
import { Grid,Paper,makeStyles } from '@material-ui/core';
function AllUsersBlock({data}) {
    
    const useStyles = makeStyles({
        paperDark: {
          width: "80%",
          paddingTop: "5px",
          paddingBottom: "5px",
          backgroundColor:"#9fa8da"
    
        },
        paperLight: {
            width: "80%",
            paddingTop: "5px",
            paddingBottom: "5px",
            backgroundColor:"#d1d9ff"
          }
      });
    
      const classes = useStyles();
    var allUsers = [];
    for (let i = 0; i < data.length; i++) {
        allUsers.push(<SingleUserBlock data = {data[i]}/>);
      }
    // console.log(data);
    // const listItems = data.map((d) => <li key={d.name}>{d.name}   {d.cuisine}</li>);
    if(allUsers.length==0)
    {
        return (
            <div>No users here yet.</div>
        );
    }


    return (
    <div style ={{
        paddingTop: '5px'
    }}>
        <Paper className = {classes.paperDark} align={"center"} elevation={20}>
            <Grid container spacing = {2}> 
                    <Grid item xs align = "right">
                        <h3>Name</h3>
                    </Grid>
                    <Grid item xs={6} align = "center">
                        <h3>Cuisine</h3>
                    </Grid>
                    <Grid item xs align = "left">
                        <h3>Time</h3>
                    </Grid>
            </Grid>
        </Paper>
        {allUsers}
    </div>
)
}

export default AllUsersBlock