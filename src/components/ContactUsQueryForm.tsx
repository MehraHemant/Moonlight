"use client";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ContactUsQueryForm() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    query: '',
  });

  // State for field errors
  const [formErrors, setFormErrors] = useState<Record<string, boolean | string>>({
    firstName: false,
    lastName: false,
    email: false,
    query: false,
  });

    // Handler for form submission
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      const errors = validate(formValues);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        const emailContent = `New query received from <b>${formValues.firstName} ${formValues.lastName}.</b><br> Their email is: ${formValues.email}.</b> <br> ${formValues.query}`;
        // await sendEmail(emailContent);
      }
    };

    const validate = (values: any) => {
      const errors: Record<string, string> = {};
      if (!values.firstName.trim()) {
        errors.firstName = 'First Name is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email address is invalid';
      }
      if (!values.query.trim()) {
        errors.query = 'Query is required';
      }
      if(values.query.length > 500){
        errors.query = 'Please limit your query to 500 characters'
      }
      return errors;
    };

  // Handle field value changes
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1,
           width: '46%'
           },
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          error={Boolean(formErrors.firstName)}
          name="firstName"
          label="First Name"
          required
          value={formValues.firstName}
          onChange={handleChange}
          helperText={formErrors.firstName}
          variant="filled"
        />
        <TextField
          error={Boolean(formErrors.lastName)}
          name="lastName"
          label="Last Name"
          value={formValues.lastName}
          onChange={handleChange}
          helperText={formErrors.lastName}
          variant="filled"
        />
      </div>
      <div>
      <TextField
          label="Email"
          required
          name="email"
          value={formValues.email}
          onChange={handleChange}
          helperText={formErrors.email}
          variant="filled"
          type="email"
          error={Boolean(formErrors.email)}
        />
        <TextField
         label="Query"
         name="query"
         value={formValues.query}
         onChange={handleChange}
         helperText={formErrors.query}
         variant="filled"
         error={Boolean(formErrors.query)}
         multiline={true}
         minRows={3}
         maxRows={3}
        />
      </div>
      <div>
        <Button type='submit'
        variant='contained'
        >Send Your Message</Button>
      </div>
      <div>
      </div>
    </Box>
  );
}

