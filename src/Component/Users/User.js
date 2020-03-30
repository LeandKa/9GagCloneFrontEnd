import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Container} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles  = makeStyles({
    media:{
      maxwidth: '500px',
      height: '250px'
    },
    type:{
      display:'inline',
      marginLeft:'10px'
    }
  });

export default function User() {

    const [user,setUser] = useState({
        username:'',
        post:[]

    });

    useEffect(()=>{
     const token = localStorage.getItem('access');
     axios.get('http://localhost:3000/user',{
         headers:{
             'token':token
         }
     })
     .then(result =>{
      setUser(result.data.user);
     })
     .catch(err =>{
       console.log('Nop')
     })
    },[])


    const classes = useStyles();
    return (
        <Container>
            <div>
        <Typography>Usuario:{user.username}</Typography>
            </div>
           <div>
           {user.post.map(ue =>(
            <Card key={ue._id}>
                <CardContent>
               <Typography>Posts</Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia  className={classes.media}
                              image={ue.imgUrl}
                              title="lorem ipsum"></CardMedia>          
                </CardActionArea>
                <CardContent>
        <Typography className={classes.type}>Points:{ue.points}</Typography> 
        <Typography className={classes.type}>Comments:{ue.commentsTotal}</Typography>     
                </CardContent>
                <CardActions>
                  <div>
                  <Link  to={`/Comments/${ue._id}`} className="btn btn-light"><ChatBubbleIcon></ChatBubbleIcon></Link>
                  <Button><MoreHorizIcon></MoreHorizIcon></Button>
                  </div>
                </CardActions>
              </Card>
         ))}
        </div>
        </Container>
    )
}
