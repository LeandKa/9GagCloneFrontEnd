import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Container,Typography,TextField, Grid,InputAdornment,makeStyles, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useForm from '../hooks/useForm';
import validate from '../Validation/LoginFormValidationRules';
import NavBarCustom from '../NavBar/NavbarCustom';


const useStyles  = makeStyles({
    container:{
      borderStyle:'solid',
      borderWidth:'1px',
      marginTop:'30px'
    },
    button: {
        marginTop:'10px',
        marginBottom:'10px',
        width:'50%'
      }
  });
  

export default function SignUp() {

    const {values,handleChange,handleSubmit,errors} = useForm({email:"",password:"",username:""},SignUp,validate);
    const history = useHistory();


    function SignUp(){
      axios.post('http://localhost:3000/signup',values)
      .then(result =>{
        history.push('/Login')
      })
      .catch(err =>{
        console.log('Erro')
      })
    }

    const classes = useStyles();
    return (
      <div>
        <Container className={classes.container}>
           <Typography>
               SignUp
           </Typography>
           <form onSubmit={handleSubmit}>
               <Grid container spacing={3} direction="column">
                <Grid item>
                    <TextField 
                    className= {`input ${errors.email && 'is-danger'}`}
                    label="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: 24
                      }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}></TextField>
                      {errors.email &&(
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </Grid>
                <Grid item>
                <TextField 
                    label="Senha"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    inputProps={{
                        maxLength: 10
                      }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }}></TextField>
                </Grid>
                <Grid item>
                <TextField 
                    label="Username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    inputProps={{
                        maxLength: 10
                      }}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }}></TextField>
                </Grid>
               </Grid>
               <Button
        variant="contained"
        color="primary"
        size="small"
        type="submit"
        className={classes.button}
        endIcon={<CloudUploadIcon />}
      >Send</Button>
           </form>
       </Container>
      </div>
    )
}
