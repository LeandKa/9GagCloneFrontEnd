import React,{useEffect,useState} from 'react';
import {List,ListItem,ListItemText,ListItemIcon} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ScheduleIcon from '@material-ui/icons/Schedule';
import axios from 'axios';


const Tags = () => {

    const [tag,setTag] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/tags')
        .then(result =>{
             setTag(result.data.tags);
        })
    },[])

    return (
        <div>
         <List className="labelList">
            <ListItem button>
            <ListItemIcon>
                 <TrendingUpIcon></TrendingUpIcon>
            </ListItemIcon>
               <ListItemText>Hot</ListItemText>
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <WhatshotIcon></WhatshotIcon>
            </ListItemIcon>
            <ListItemText>Trending</ListItemText> 
            </ListItem>
            <ListItem button>
            <ListItemIcon>
                <ScheduleIcon></ScheduleIcon>
            </ListItemIcon>
            <ListItemText>Fresh</ListItemText>
            </ListItem>

            <ListItem className="tagHeader">Popular</ListItem>
            {tag.map(tags =>(
            <div key={tags._id}>
               <Link className=" btn btn-light btn-lg btn-block btn-sm" to={`/PostTag/${tags._id}`}>{tags.name}</Link>
            </div>
          ))}
          <ListItem>
               <a href="/" className="footer">Footer</a>
               <a href="/" className="footer">Footer</a>
               <a href="/" className="footer">Footer</a>

          </ListItem>
        </List>
        </div>
    )
}


export default Tags;