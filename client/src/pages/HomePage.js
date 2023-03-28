import { useEffect, useState } from "react";
import Post from "./uploads/PostCard";


export default function PageFeed(){
    const [posts,setposts]= useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/newpost').then(response=>{
            response.json().then(posts=>{
                setposts(posts); 
                console.log(posts);
            });
        });
    },[]);
    
    function handelnewpost() { window.location.href='/createpost';}

    return(
        <>
        <div>Welcome to page feed<br/>
        <button onClick={handelnewpost}>Create new Post</button></div>
        {posts.length>0 && posts.map(post=>(
            <Post {...post}/>
        ))}
    
        </>
    );
}