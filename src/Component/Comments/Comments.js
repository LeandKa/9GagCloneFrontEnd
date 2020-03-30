import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent, Card, CardActions, CardActionArea,
  TextareaAutosize, Box, Typography, Button, CardMedia
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavBarCustom from '../NavBar/NavbarCustom';

const useStyles = makeStyles({
  media: {
    maxwidth: '500px',
    height: '250px'
  },
  type: {
    display: 'inline',
    marginLeft: '10px'
  },
  textArea: {
    width: '100%',
    margin: '0',
    boxSizing: 'border-box',
    borderRadius: '0',
    lineHeight: '1,6em',
    resize:'none'
  },
  box: {
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray',
    marginBottom:'20px'
  },
  buttonsAction: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'gray',
    '&:hover': {
      textColor: 'gray'
    },
    marginLeft:'5px'
  },
  buttonsActionPost: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'gray',
    '&:hover': {
      textColor: 'gray'
    },
    textAlign:'center'
  },
  boxComment:{
    width:'100%',
    height:'100%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'gray',
    marginBottom:'30px',
  },
  h:{
    display:'inline',
    fontSize: '12px',
    lineHeight: '20px',
    height: '20px',
    color: '#999',
    marginBottom: '4px',
    marginLeft:'4px'
  },
  hText:{
    h:{
      fontSize: '12px',
      lineHeight: '20px',
      height: '20px',
      color: '#999',
      marginBottom: '4px',
      marginLeft:'4px',
      marginBottom:'4px'
    }
  }
});

const Comments = () => {

  let {postId} = useParams();

  const [post,setPost]= useState({
    title:'',
    imgUrl:'',
    userId:'',
    points:'',
    commentTotal:''
  });
  const [comments,setComments]= useState([]);
  const [text,setText] = useState({text:''});
  const [user,setUser] = useState({userId:''});
  const [commeSubmit,setCommeSubmit] = useState({
    post:postId,
    userId:'',
    points:0,
    text:''
  });
  const [erros,setErro] = useState(false)
  const cleanState = () =>{
    setText({text:''});
  }

  useEffect(()=>{
    
    axios.get(`http://localhost:3000/post/comments/${postId}`)
    .then(result =>{
      setPost(result.data.post);
      setComments(result.data.post.comment);
    })

    const access = localStorage.getItem('access')
      if(access){
          axios.get('http://localhost:3000/user',{
            headers:{
              'token':access
            }
          }).then(result =>{
             setUser(result.data.user._id)
          })
      }else{
          console.log('No')
      }

  },[])

  const handleSubmit = (event) =>{
  const access = localStorage.getItem('access')
   event.preventDefault();
    axios.post('http://localhost:3000/create-comment',commeSubmit,{
      headers:{
        'token':access
      }})
    .then(result =>{
       const newComment = comments.concat(result.data.object)
       setComments(newComment);
       setText(cleanState);
    })
    .catch(err =>{
      console.log('Nao foi submitado')
    })
    event.target.value=''
  }

  useEffect(()=>{
    setCommeSubmit({
      text:text.text,
      userId:user,
      post:postId,
      points:0
    })
  },[text])


  const handleChange = (event) =>{
    event.persist();
      setText(values => ({ ...values, [event.target.name]: event.target.value }));
  }
  


  const delComment = (id) =>{
    const access = localStorage.getItem('access')
    axios.delete(`http://localhost:3000/delete-comment/${id}`,{
      headers: {'token':access}
  })
  .then(result =>{
      console.log('Ok Deletado')
  })
  .catch(err =>{
     alert('Este nao e o seu comentario')
  })
  }




  function setPointUp (id,points) {
    const pointsNew = points + 1;
    axios.put(`http://localhost:3000/edit-comment/${id}`,{
      points:pointsNew
    })
    .then(result =>{
      window.location.reload()
    })
  }

  function setPointDown(id,points){
    const pointsNew = points - 1;
    axios.put(`http://localhost:3000/edit-comment/${id}`,{
      points:pointsNew
    })
    .then(result =>{
      window.location.reload()
    })
  }


  const classes = useStyles();
  return (
    <div>
      <div>
      <Card>
        <CardContent>
  <Typography>{post.title}</Typography>
        </CardContent>
        <CardActionArea>
          <CardMedia className={classes.media}
                     image={post.imgUrl}
            title="lorem ipsum"></CardMedia>
        </CardActionArea>
        <CardContent>
  <Typography className={classes.type}>Points:{post.points}</Typography>
  <Typography className={classes.type}>Comments:{post.commentTotal}</Typography>
        </CardContent>
        <CardActions>
          <div>
            <Button  ><ArrowUpwardIcon></ArrowUpwardIcon></Button>
            <Button ><ArrowDownwardIcon></ArrowDownwardIcon></Button>
            <Button><MoreHorizIcon></MoreHorizIcon></Button>
          </div>
        </CardActions>
      </Card>
      <hr className="line"></hr>
   <form onSubmit={handleSubmit}>
      <TextareaAutosize className={classes.textArea}  name="text" value={text.text} onChange={handleChange} rowsMin={3} aria-label="empty textarea" placeholder="Write here"></TextareaAutosize>
      <Box className={classes.box} >
        <Button className={classes.buttonsActionPost} type="submit"startIcon={<CloudUploadIcon />}>Post</Button>
      </Box>
      </form>

      {comments.map(comme =>(
        <div key={comme._id}>
        <Box className={classes.boxComment}>
        {erros === true &&
        <h2>
          Este nao e o seu comentario
        </h2>
      }
       <h4 className={classes.h}>User:{comme.user.username}</h4>
       <h4 className={classes.h}>Points:{comme.points}</h4>
       <TextareaAutosize className={classes.textArea} readOnly onChange={handleChange} rowsMin={3} aria-label="empty textarea" defaultValue={comme.text}></TextareaAutosize>
          <Button onClick={()=> setPointUp(comme._id,comme.points)} className={classes.buttonsAction}  ><ArrowUpwardIcon></ArrowUpwardIcon></Button>
          <Button onClick={()=> setPointDown(comme._id,comme.points)} className={classes.buttonsAction} ><ArrowDownwardIcon></ArrowDownwardIcon></Button>
          <Button className={classes.buttonsAction} onClick={()=> delComment(comme._id)}><DeleteIcon /></Button>
        </Box>
      </div>
        ))}
    </div>
    </div>
    
  )
}


export default Comments;