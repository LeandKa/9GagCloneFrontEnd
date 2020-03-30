import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
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


const Main = (props) => {

    const [post,setPost] = useState([]);
    const [count,setCount] = useState();
    const [start,setStart] = useState(1);
    const [points,setPoints] = useState(0);


    useEffect(()=>{
        axios.get(`http://localhost:3000/post/${start}`)
        .then(result =>{
             setPost(result.data.post);
             setCount(result.data.pageSize)
        })
    },[])

    useEffect(()=>{
       
        axios.get(`http://localhost:3000/post/${start}`)
        .then(result =>{
            const novoPost =  post.concat(result.data.post)
            setPost(novoPost)
        })
       

    },[start])


  function fetchPost () {
      if(start !== 0){
        setStart(prevState => prevState + 1);
      }else{
          console.log('Nop')
      }
    }

    function setPoint (id,points) {
      const pointsNew = points + 1;
      axios.put(`http://localhost:3000/edit-post/${id}`,{
        points:pointsNew
      })
      .then(result =>{
        console.log('ok')
      })
    }

    function setPointDown(id,points){
      const pointsNew = points - 1;
      axios.put(`http://localhost:3000/edit-post/${id}`,{
        points:pointsNew
      })
      .then(result =>{
        console.log('ok')
      })
    }

    const classes = useStyles();
    return (
      <div>
        <div>
            <InfiniteScroll
            dataLength={post.length}
            next={fetchPost}
            hasMore="true"
            loader={<h4>Loading...</h4>}
            >
               {post.map(prod =>(
            <div key={prod._id}>
              <Card>
                <CardContent>
               <Typography>{prod.title}</Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia  className={classes.media}
                              image={prod.imgUrl}
                              title="lorem ipsum"></CardMedia>          
                </CardActionArea>
                <CardContent>
                   <Typography className={classes.type}>Points:{prod.points}</Typography> 
                  <Typography className={classes.type}>Comments:{prod.commentTotal}</Typography>     
                </CardContent>
                <CardActions>
                  <div>
                  <Button onClick={()=> setPoint(prod._id,prod.points)}><ArrowUpwardIcon></ArrowUpwardIcon></Button>
                  <Button onClick={()=> setPointDown(prod._id,prod.points)}><ArrowDownwardIcon></ArrowDownwardIcon></Button>
                  <Link to={`/Comments/${prod._id}`} className="btn btn-light"><ChatBubbleIcon></ChatBubbleIcon></Link>
                  <Button><MoreHorizIcon></MoreHorizIcon></Button>
                  </div>
                </CardActions>
              </Card>

              <hr className="line"></hr>
           
            </div>

          ))}

            </InfiniteScroll>
          
        </div>
      </div>
      
    )
    
}

export default Main;