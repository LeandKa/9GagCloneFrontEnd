import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useParams} from "react-router";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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



export default function PostTag() {

    let {tagId} = useParams();

    const[post,setPosts] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/TagPosts/${tagId}`)
        .then(result =>{
            setPosts(result.data.posts.post);
        })
    },[])
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/TagPosts/${tagId}`)
        .then(result =>{
            setPosts(result.data.posts.post);
        })
    },[tagId])

    const classes = useStyles();

    return (
      <div>
           {post.map(post =>(
            <div key={post._id}>
                <Card>
                <CardContent>
               <Typography>{post.title}</Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia  className={classes.media}
                              image={post.imgUrl}
                              title="lorem ipsum"></CardMedia>          
                </CardActionArea>
                <CardContent>
                   <Typography className={classes.type}>Points:{post.points}</Typography> 
                  <Typography className={classes.type}>Comments:{post.commentTotal}</Typography>     
                </CardContent>
                <CardActions>
                  <div>
                  <Link to={`/Comments/${post._id}`} className="btn btn-light"><ChatBubbleIcon></ChatBubbleIcon></Link>
                  <Button><MoreHorizIcon></MoreHorizIcon></Button>
                  </div>
                </CardActions>
              </Card>
            </div>
            ))}
      </div>
    )
}
