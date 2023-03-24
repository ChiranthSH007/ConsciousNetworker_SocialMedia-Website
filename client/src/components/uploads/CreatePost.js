import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePost(){
    const [files,setfiles]=useState("");
    const[userpost,setuserpost] =useState("");
    const[redirect,setredirect] =useState("");
    
    
    async function createNewPost(ev) {
        const data=new FormData();
        data.set('userpost',userpost);
        data.set('file',files[0]);
        ev.preventDefault();
        //console.log(userpost);
        const resp= await fetch('http://localhost:4000/newpost',{
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if(resp.ok){
            setredirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/pagefeed'} />
    }

    return(
        <div>
            You are creating a post
            <form onSubmit={createNewPost}>
                <input type="file" 
                onChange={ev=>setfiles(ev.target.files)} 
                /><br/>

                <textarea
                 value={userpost} 
                 placeholder={"newpost"}
                 cols="30" 
                 rows='10' 
                 onChange={ev=>setuserpost(ev.target.value)}></textarea><br/>

                <button>Post</button>
            </form>
        </div>
    );
}