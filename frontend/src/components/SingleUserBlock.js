import React from 'react'

function SingleUserBlock({data}) {
    return (
    <div><li key={data.name}>{data.name} - {data.cuisine} - {data.start_time} to {data.end_time}</li></div>
    )
}

export default SingleUserBlock