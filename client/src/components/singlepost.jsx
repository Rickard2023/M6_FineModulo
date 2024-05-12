import {React} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button} from "react-bootstrap";
export default function SinglePost({props}) {


    const appURL = "http://localhost:3000";
    // GET VIEWED POST
    const {id} = useParams();
    const [post, setPost] = useState(0); 
    function handlePost(x)
    {
        setPost(x);
    }
    async function getViewedPost()
    {
        await fetch(appURL +"/posts/" + id, {
            method: "GET",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8",   
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {              
            handlePost(data);
        })

        .catch((err) => console.log("problem: ", err))
    }

    if(post == 0 || post._id != id)
        getViewedPost();

    ///////////////////////////////////////////////////////////



    // GET SINGLE USER
    const authorID = post.author;
    const userURL = (appURL + "/users/" + authorID);

    const [user, setUser] = useState(0);
    function handleUser(x)
    {
        setUser(x);
    }
    async function getUser()
    {

        await fetch(userURL , {
            method: "GET",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8",   
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {     
            handleUser(data);            
        })

        .catch((err) => console.log("problem: ", err))
    }
    if(user == 0)
        getUser();

     ///////////////////////////////////////////////////////////

     // GET COMMENTS

     const [commentList, setCommentList] = useState(0);
     const commURL = "http://localhost:3000/posts/comments/"+ id;

     function handleCommentList(c)
     {
        setCommentList(c);
     }
     async function getCommentList()
     {
 
         await fetch(commURL , {
             method: "GET",      
             headers: { 
             "Content-type": "application/json; charset=UTF-8",   
             },
         })
         .then(resp => {
             return resp.json()
         })
         .then(data => {     
            handleCommentList(data);            
         })
 
         .catch((err) => console.log("problem: ", err))
     }
     if(commentList == 0)
        getCommentList();

     ///////////////////////////////////////////////////////////

     // get all the users to fill the comment

    const [userList, setUserList] = useState(0);
    
    function handleUserList(x)
    {
        setUserList(x);
    }
    async function getUserList()
    {

        await fetch("http://localhost:3000/users", {
            method: "GET",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8",   
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {     
            handleUserList(data);
        })

        .catch((err) => console.log("problem: ", err))
    }

    if(userList == 0)
        getUserList();

    if(commentList && userList){
        for(let c of commentList)
        {
            for(let u of userList)
            {
                if(c.user == u._id) {
                   c.user = u.username;
                }
            }
        }
    }
   

    return (
        <>
        {user && post &&
            <Card style={{ width: '18rem' }}>
               <Card.Body>
                 <Card.Title>{post.title}</Card.Title>
                 <Card.Text>
                   By {user.username}
                 </Card.Text>
                 <Card.Text>
                  {post.content}
                 </Card.Text>
                 <Button variant="primary">Go somewhere</Button>
               </Card.Body>
            </Card>          
        }
        {commentList && commentList.map((c) =>        
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                 
                  <Card.Text>
                    By {c.user}
                  </Card.Text>
                  <Card.Text>
                   {c.content}
                  </Card.Text>
                </Card.Body>
             </Card>
        )}
        </> 
    );
}
