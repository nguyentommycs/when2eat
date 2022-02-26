import React from 'react'

function SingleUserBlock({data}) {
    return (
    <div><li key={data.name}>{data.name} - {data.cuisine}</li></div>
    )
}

export default SingleUserBlock