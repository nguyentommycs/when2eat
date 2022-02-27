import { Grid, Typography } from '@material-ui/core'
import React from 'react'

function SingleUserBlock({data}) {
    return (
    <div>
        <Grid container spacing = {2}> 
                <Grid item xs align = "right">
                    {data.name}
                </Grid>
                <Grid item xs={2} align = "center">
                    {data.cuisine}
                </Grid>
                <Grid item xs align = "left">
                    {data.start_time.substring(0,5)} to {data.end_time.substring(0,5)} 
                </Grid>
        </Grid>

    </div>
    )
}

export default SingleUserBlock