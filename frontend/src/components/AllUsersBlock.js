import React from 'react'
import SingleUserBlock from "./SingleUserBlock";
function AllUsersBlock({data}) {
    var allUsers = [];
    for (let i = 0; i < data.length; i++) {
        allUsers.push(<SingleUserBlock data = {data[i]}/>);
      }
    // console.log(data);
    // const listItems = data.map((d) => <li key={d.name}>{d.name}   {d.cuisine}</li>);
    return (
    <div>{allUsers}</div>
    )
}

export default AllUsersBlock