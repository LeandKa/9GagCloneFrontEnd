import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Component/Home/Home';
import 'typeface-roboto';
import Tags from './Component/Tags/Tags';
import { Container, Row, Col } from 'reactstrap';
import Comments from '../src/Component/Comments/Comments';
import Login from '../src/Component/Login/Login';
import Logout from './Component/Users/Logout';
import User from './Component/Users/User';
import SignUp from './Component/Users/SignUp';
import Post from './Component/Post/Post';
import NavBarCustom from './Component/NavBar/NavbarCustom';
import PostTag from './Component/Post/PostTag';

function App() {


  const [isLog,setIsLog] = useState(false);


  useEffect(()=>{
  const access = localStorage.getItem('access')
  axios.get('http://localhost:3000/user',{
    headers:{
      'user':access
    }
  }).then(result =>{
    setIsLog(true);
    console.log('Aqui')
  })
  .catch(err =>{
   setIsLog(false)
   console.log('Noa aqui')
  })
  },[])

  useEffect(()=>{
    if(localStorage.getItem('access') === null){
      setIsLog(false) 
    }else{
      setIsLog(true)
    }
  },[isLog])


  return (
    <div>
      <Router>
      <Switch>
    <div className="mainBody">
      <NavBarCustom log={isLog}></NavBarCustom>
      <Container className="container">
        <Row>
        <Col xs="6" sm="4"><Tags></Tags></Col>
        <Col xs="6" sm="4">
        <Route path="/" component={Home} exact></Route>
        <Route path="/Comments/:postId" component={Comments} exact></Route>
        <Route path="/Login" component={Login} exact></Route>
        <Route path="/SignUp" component={SignUp} exact></Route>
        <Route path="/UploadPost" component={Post} exact></Route>
        <Route path="/Logout" component={Logout} exact></Route>
        <Route path="/User" component={User} exact></Route>
        <Route path="/PostTag/:tagId" component={PostTag} exact></Route>
        </Col>
        <Col sm="4">Merch</Col>
        </Row>
      </Container>
    </div>
    </Switch>
    </Router>
    </div>
  );
}

export default App;