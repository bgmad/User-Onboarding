import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().required('email is required'),
  password: yup.string().required('password is required').min(8, 'minimum 8 characters'),
  tos: yup.boolean().oneOf([true], 'check terms of services')
});

function App() {
  const [form, setForm] = useState(
    {
      name: '',
      email: '',
      password: '',
      tos: false,
    }
  );
  const [errors, setErrors] = useState(
    {
      name: '',
      email: '',
      password: '',
      tos: '',
    } 
  );
  const [disabled, setDisabled] = useState(true);

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setErrors({ ...errors, [name]: '' }))
    .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
  }
    
  const changeHandle = e => {
    const { checked, value, name, type } = e.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };
  
  const submit = e => {
    e.preventDefault();
    const newUser = {
      name: form.name.trim(), 
      email: form.email, 
      password: form.password, 
      tos: form.tos
    }
    axios.post(`https://reqres.in/api/users`, newUser)
    .then(res => {
      setForm({
        name: '',
        email: '',
        password: '',
        tos: false,
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    schema.isValid(form).then(valid => setDisabled(!valid));
    console.log(form);
  }, [form]);

  return (
    <div>
      <div style={{ color: 'red' }}>
        <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.tos}</div>
      </div>
      <form onSubmit={submit}>
        <label>
          Name: 
          <input className='name-input' onChange={changeHandle} value={form.name} name='name' type='text'/>
        </label>
        <label>
          Email: 
          <input className='email-input' onChange={changeHandle} value={form.email} name='email' type='email'/>
        </label>
        <label>
          Password: 
          <input className='password-input' onChange={changeHandle} value={form.password} name='password' type='password'/>
        </label>
        <label>
          Terms of services: 
          <input className='tos-input' onChange={changeHandle} checked={form.tos} name='tos' type='checkbox'/>
        </label>
        <label>
          <button disabled={disabled}>Submit</button>
        </label>
      </form>
    </div>
  );
}

export default App;
