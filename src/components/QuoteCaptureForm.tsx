"use client";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useQuote } from './QuoteContext';
import { sendEmail } from '@/clients/email.client';
import { Grid } from '@mui/material';

export default function QuoteCaptureForm() {
  const { quote, addToQuote, removeFromQuote } = useQuote();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // State for field errors
  const [formErrors, setFormErrors] = useState<Record<string, boolean | string>>({
    firstName: false,
    lastName: false,
    email: false,
  });

  // Handler for form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const emailContent = `New query received from <b>${formValues.firstName} ${formValues.lastName}.</b><br> Their email is: ${formValues.email}.</b> <br> They have requested quote for ${quote.map((q)=>q.id).join('')}`;
      console.info("The emailContent that we have here is", emailContent)
      await sendEmail({subject: `Moonlite Web:: New Quote Requested`, emailContent});
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
        '& .MuiTextField-root': {
          width: '100%'
        },
         height: '100%'
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={1} style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '100%'}}>
        <Grid item xs={12} sm={12} md={8}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
        <TextField
          error={Boolean(formErrors.lastName)}
          name="lastName"
          label="Last Name"
          value={formValues.lastName}
          onChange={handleChange}
          helperText={formErrors.lastName}
          variant="filled"
        />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
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
          </Grid>
          <Grid item xs={12} style={{display: 'flex',justifyContent:'center', alignItems: 'center'}}>
          <Button type='submit'
          variant='contained'
          style={{backgroundColor: 'black'}}
        >Request Quote</Button>
            </Grid>
      </Grid>
    </Box>
  );
}

