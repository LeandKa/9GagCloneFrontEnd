import React,{useEffect,useState} from 'react';
import validate from '../Validation/LoginFormValidationRules';

const useForm = (initialValues,callback,validate) => {

    const [values, setValues] = useState(initialValues);
    const [errors,setErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);
  
    const handleSubmit = (event) => {
      if (event) event.preventDefault();
        setIsSubmitting(true);
        setErrors(validate(values));
    };

    useEffect(()=>{
      if(Object.keys(errors).length === 0 && isSubmitting){
         callback();
      }
    },[errors])
  
    const handleChange = (event) => {
      event.persist();
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
  
    return {
      handleChange,
      handleSubmit,
      values,
      errors
    }
  };
  
  export default useForm;