import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Container, Typography, FormControl,Input, InputLabel,MenuItem, Select, Button,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';




const useStyles  = makeStyles({
  root:{
      justifyContent:'center',
      flexGrow:1
  },
  formControl:{
      marginTop:'10px'
  }
  });
  



export default function Post() {

    const [post,setPost] = useState({
        title:'',
        points:0,
        commentsTotal:0,
    });
    const[selectTag,setSelectTag]= useState({})
    const [tag,setTag] = useState([]);
    const [image,setImage] = useState('')
    const [userId,setUserId] = useState({})
    const history = useHistory();


    useEffect(()=>{
        axios.get('http://localhost:3000/tags')
        .then(result =>{
           setTag(result.data.tags);
        })
        .catch(err =>{
           console.log('Error')
        })

        const token = localStorage.getItem('access');
        axios.get('http://localhost:3000/user',{
            headers:{
                'token':token
            }
        })
        .then(result =>{
         setUserId(result.data.user);
        })
        .catch(err =>{
          console.log('Nop')
        })
    },[])

    const handleChangePost = (event) =>{
        setPost({...post,[event.target.name]:event.target.value});
    }
    const handleChangeTag = (event) =>{
        setSelectTag({...selectTag,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event) =>{
      const access = localStorage.getItem('access')
       event.preventDefault();
       const formData = new FormData();
       formData.append('title',post.title)
       formData.append('points',post.points)
       formData.append('commentsTotal',post.commentsTotal)
       formData.append('userId',userId._id)
       formData.append('tag',selectTag.tag);
       formData.append('img',image)

       axios.post('http://localhost:3000/create-post',formData,{
        headers:{
          'token':access
        }})
       .then(result =>{
        history.push('/')
       })
       .catch(err =>{
        console.log(err)
       })
        
    }

    const handleChangeImg = (event) =>{
        setImage(event.target.files[0])
    }

    const classes = useStyles();
    return (
        <Grid container spacing={6}>
               <div className={classes.root}>
                   <form onSubmit={handleSubmit}>
                       <Typography>
                           Upload Post
                       </Typography>
                       <Grid item xs={6}>
                       <FormControl className={classes.formControl}>
                           <InputLabel>Title</InputLabel>
                           <Input name="title" onChange={handleChangePost}></Input>
                       </FormControl>
                       </Grid>
                       <Grid item xs={6}>
                       <FormControl className={classes.formControl}>
                           <InputLabel>Tag</InputLabel>
                           <Select name="tag" value={tag._id} onChange={handleChangeTag}>
                                { tag.map(options =>(
                                    <MenuItem key={options._id} value={options._id}>
                                     {options.name}
                                  </MenuItem>
                                   ))}
                            </Select>
                       </FormControl>
                       </Grid>
                       <Grid item xs={12}>
                       <FormControl className={classes.formControl}>
                          <Input onChange={handleChangeImg} type="file" name="imgUrl"></Input>
                       </FormControl>
                       </Grid>

                       <Button type="submit" variant="true">Upload Post</Button>

                   </form>
               </div>
        </Grid>
    )
}
