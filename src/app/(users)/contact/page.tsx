import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import ContactUsQueryForm from '@/components/ContactUsQueryForm';
import FactoryIcon from '@mui/icons-material/Factory';
import LocationCityIcon from '@mui/icons-material/LocationCity';
// components/Map.js
// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Contact',
};

export default function Contact() {
    return (
        <main className={"sharedMain"}>
            <ContactSection/>
        </main>
    )
}

function ContactSection() {
  return (
    <Container sx={{paddingTop: '20px'}}>
<Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
          <div style={{  position: 'relative', height: '400px', margin: '0 0', padding: '0 0'}}>
      <Image src='/experienced-oem.png' alt='Opening image' 
                      style={{objectFit:"contain"}}
                                      fill={true}
                                      priority
       />
      </div>
          </Grid>
          <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
          {"Let's Stay In Touch"}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          We have excellent OEM capabilities. Our in house professionals can reverse engineer any design/ product with the assistance of robust machinery setup that we have.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {"Drop us A Line"}
        </Typography>
        <ContactUsQueryForm />
          </Grid>
        </Grid>

        <Typography variant="h4" gutterBottom>
          {"Reach Out To Us Via"}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ContactCard
              introConfig={{ heading: "Phone", icon: <PhoneIcon fontSize='inherit' /> }}
              buttonConfig={{ href: "tel:+919411982769", text: "+91 941 198 2769" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ContactCard
              introConfig={{ heading: "e-Mail", icon: <EmailIcon fontSize='inherit' /> }}
              buttonConfig={{ href: "mailto:info@moonliteinternational.net", text: "info@moonliteinternational.net" }}
              secondaryButtonConfig={{ href: "mailto:alok@moonliteinternational.net", text: "alok@moonliteinternational.net" }}
              />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ContactCard
              introConfig={{ heading: "Corporate Address", icon: <FactoryIcon fontSize='inherit' /> }}
              buttonConfig={{ text: "C  - 195, Sector - I, Tala Nagri, Ramghat Road, Aligarh (U.P.) - 202001, INDIA" }} />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6} lg={6}>

            <ContactCard
              introConfig={{ heading: "Unit II", icon: <LocationCityIcon fontSize='inherit' /> }}
              buttonConfig={{ text:"5/800, Shakti Nagar, Goolar Road, Aligarh - 202001, INDIA"}} />
          </Grid> */}
        </Grid>
    </Container>
  );
}
function ContactCard({ introConfig, buttonConfig, secondaryButtonConfig }: {
  introConfig: { heading: string, icon: JSX.Element };
  buttonConfig: { href?: string, text: string },
  secondaryButtonConfig?: { href?: string, text: string },
}) {
  return <Card sx={{
    textAlign: 'center',
    backgroundColor: 'rgb(245, 222, 179, 0.29)',
    // backgroundColor: 'rgb(243, 236, 223, 1)',

  }}>
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          {introConfig.icon}
          {introConfig.heading}
        </div>
      </Typography>
      <Button variant="text"
        sx={{
          textTransform: 'none',
          color:'text.primary',
          alignSelf: 'center', width: '100%', fontWeight: 700
        }}
        href={buttonConfig?.href}
        >
        {buttonConfig.text}
      </Button>
      {secondaryButtonConfig && <Button variant="text"
        sx={{
          textTransform: 'none',
          color:'text.primary',
          alignSelf: 'center', width: '100%', fontWeight: 700
        }}
        href={secondaryButtonConfig?.href}
        >
        {secondaryButtonConfig.text}
      </Button>}
    </CardContent>
  </Card>
}


// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -34.397, // Specify your latitude
//   lng: 150.644  // Specify your longitude
// };

// const Map = () => (
//   <LoadScript
//     googleMapsApiKey="YOUR_API_KEY" // Replace with your Google Maps API key
//   >
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//     >
//       { /* Child components, like markers, info windows, etc. */ }
//     </GoogleMap>
//   </LoadScript>
// );