import  React, { useState , useEffect } from 'react'


export const Home = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div style={{ " display":" flex",
            "justify-content": "center",
            "align-items": "center",          
            "text-align": "center",
            "background": "#acacac9d"}} >
            <p8 style={{ "font-family":"courier,arial,helvetica" , padding: "10px 20px ", textAlign: "center", color: "Black" , "font-size": "56px"}} > Time : {date.toLocaleTimeString()}</p8>
            <p9 style={{ "font-family":"courier,arial,helvetica",padding: "10px 500px ", textAlign: "center", color: "Black", "font-size": "56px" }}> Date : {date.toLocaleDateString()}</p9>
            <p10 style={{ "font-family":"courier,arial,helvetica",padding: "10px 100px ", textAlign: "center", color: "Black", "font-size": "56px" }}> Istanbul/Turkey</p10>
         

        </div>
    )
}

export default Home