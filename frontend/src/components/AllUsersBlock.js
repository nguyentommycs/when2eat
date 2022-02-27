import React from 'react'
import SingleUserBlock from "./SingleUserBlock";
import { Grid,Typography } from '@material-ui/core';
function AllUsersBlock({data}) {
    
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
    <div>
        <Grid container spacing = {2}> 
            <Grid item xs align = "right">
            <Typography component="span" variant="h6">
                Name
            </Typography>
            </Grid>
            <Grid item xs={2} align = "center">
            <Typography component="span" variant="h6">
                Cuisine
            </Typography>
            </Grid>
            <Grid item xs align = "left">
            <Typography component="span" variant="h6">
                Time
            </Typography>
            </Grid>
        </Grid>
        {allUsers}
    </div>
    )
}

export default AllUsersBlock