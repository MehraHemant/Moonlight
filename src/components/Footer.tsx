import { CompanyLogoWrapped } from './CompanyLogo';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Box, Container, Grid, Link, Typography, TextField, Button, Divider, IconButton } from '@mui/material';
import { CATEGORIES, MATERIALS } from '@/constants';

export const Footer = () => {
  return (
    <Box sx={{
      backgroundColor: 'grey.100',
      pb: 1, pt: 4, mt: 2, width: '100%'
      , borderRadius: '20px'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Hardware
            </Typography>
            {Object.keys(CATEGORIES[0]).slice(0,5).map((cname) => {
              return <span
                key={cname}
              ><Link
                className='nav-links'
                href={`/${cname.replaceAll(' ', '-')}/builders-hardware-manufacturers`}
                key={cname}
                variant="subtitle1" color="textSecondary" style={{ textDecoration: 'none' }}
              >
                  {cname}
                </Link><br /></span>
            })}
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Material
            </Typography>
            {MATERIALS.slice(0,5).map((name) => (<span key={name}>
              <Link key={name} href={getMaterialUrl(name)}
                className='nav-links'
                variant="subtitle1" color="textSecondary"
                style={{ textDecoration: 'none', padding: 0, margin: 0 }}
              >
                {name}
              </Link><br /></span>))}
            <span>
              <Link
              className='nav-links'
              href={'/architectural-builders-hardware-fitting-materials'}
                variant="subtitle1" color="textSecondary"
                style={{ textDecoration: 'none', padding: 0, margin: 0 }}
              >
                View More...
              </Link><br /></span>
          </Grid>
          <Grid item xs={6} sm={2} mt={5}>
            <Link className='nav-links' href="/about-us" variant="subtitle1" style={{ textDecoration: 'none' }} color="textSecondary">About Us</Link><br />
            <Link className='nav-links' href="#" variant="subtitle1" style={{textDecoration: 'none'}} color="textSecondary">Blog</Link><br />
            <Link className='nav-links' href="/faq" variant="subtitle1" style={{ textDecoration: 'none' }} color="textSecondary">FAQ</Link><br />
            <Link className='nav-links' href="/architectural-builders-hardware-finishes" variant="subtitle1" style={{ textDecoration: 'none' }} color="textSecondary">Finishes</Link><br />
            <Link className='nav-links' href="/contact" variant="subtitle1" style={{ textDecoration: 'none' }} color="textSecondary">Contact Us</Link><br />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Subscribe to our Newsletter
            </Typography>
            <TextField
              variant="outlined"
              color="error"
              placeholder="you@domain.com"
              size="small"
              sx={{ mr: 2, flexGrow: 1, mb: 1, width: '50%' }}
            />
            <Button variant="contained" color="error" endIcon={<MailOutlineIcon />}>
              Subscribe
            </Button>
            <div>
            <Typography mt={2} variant="caption" fontWeight={'bold'} component={'div'} color="textPrimary" gutterBottom>
              Company Working Hours
              <Typography variant="caption" component={'div'} color="textPrimary" gutterBottom>
              Monday-Saturday: 8:30 A.M. - 6:00 P.M. IST
            </Typography>
            <Typography variant="caption" component={'div'} color="textPrimary" gutterBottom>
              Sunday: Closed
            </Typography>

            </Typography>
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container
          sx={{ py: 5 }}>
          <div className={"footer-contact-info-container"}>
            <span>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                Address
              </Typography>
              <Typography variant="overline" color="textSecondary" gutterBottom>
                C  - 195, Sector - I, Tala Nagri, Ramghat Road, Aligarh (U.P.) - 202001, INDIA
              </Typography>
            </span>
            <span>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                E-mail
              </Typography>
              <Link href={'mailto:info@moonliteinternational.net'} gutterBottom variant='subtitle1' style={{ textDecoration: "none" }} color="textSecondary">info@moonliteinternational.net</Link>
              <Typography variant='subtitle1' style={{ textDecoration: "none" }} color="textSecondary">|</Typography>
              <Link href={'mailto:alok@moonliteinternational.net'} gutterBottom variant='subtitle1' style={{ textDecoration: "none" }} color="textSecondary">alok@moonliteinternational.net</Link>
            </span>
            <span>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                Phone
              </Typography>
              <Link href={'tel:+919411982769'} gutterBottom variant='subtitle1' style={{ textDecoration: "none" }} color="textSecondary">+91 941 198 2769</Link>
            </span>
          </div>
        </Grid>
        <hr />
        <Grid item xs={12} sm={2} sx={{ mt: 3 }} >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', rowGap: '8px' }}>
            <div style={{
              display: 'grid',
              height: '88px',
              width: '88px',
              backgroundColor: 'black',
              borderRadius: '88px'
            }}>
              <CompanyLogoWrapped />
            </div>
            <Typography fontWeight="500" variant="caption" color="textPrimary">
              Exporters and Manufacturers of Architectural Builders Hardware Fittings and Ironmongery
            </Typography>
          </div>
          <Box mb={1} mt={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div>
              {/* @TODO: Add links here */}
            <Link href="#" color="inherit" sx={{ mx: 1 }}><LinkedInIcon /></Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><FacebookIcon /></Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><XIcon /></Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}><PinterestIcon /></Link>
            </div>
            <div>
            | <Link className='nav-links' href="#" variant="subtitle1" style={{ textDecoration: 'none' }} color="textSecondary">Site Map</Link><br />
            </div>
          </Box>
          <Typography mb={1} variant="body2" color="textSecondary" align="center">
            All Rights Reserved © 2024 Moonlite International
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

const getMaterialUrl = (name: string) => `/Architectural-Builders-Hardware-Exporters-India/${name.replace(' / ', ' ').split(" ").join("-").toLowerCase()}-hardware`