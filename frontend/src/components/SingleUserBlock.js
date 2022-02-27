import { Grid, Typography, makeStyles,Paper } from '@material-ui/core'
import React from 'react'



function SingleUserBlock({data}) {
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

    return (
    <div style ={{
        paddingTop: '5px'
    }}>
        <Paper className = {classes.paperDark} align={"center"} elevation={20}>
            <Grid container spacing = {2}> 
                    <Grid item xs align = "right">
                        {data.name}
                    </Grid>
                    <Grid item xs={6} align = "center">
                        {data.cuisine}
                    </Grid>
                    <Grid item xs align = "left">
                        {data.start_time.substring(0,5)} to {data.end_time.substring(0,5)} 
                    </Grid>
            </Grid>
        </Paper>

    </div>
    )
}

export default SingleUserBlock