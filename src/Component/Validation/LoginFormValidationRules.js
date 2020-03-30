import React,{useEffect,useState} from 'react';

export default function LoginFormValidationRules(values) {
    let errors = {}
    
    if (!values.email) {
        errors.email = 'Email address is required';
      }


    return errors
};
