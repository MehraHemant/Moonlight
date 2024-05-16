import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Header } from '@/components/Header'
 
export default function NotFound() {
  return (<>
  <header>
  <Header/>
  </header>
  <main className='sharedMain'>
  <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '90vh'}}
    >
      <Grid item xs={12} md={6} textAlign="center">
        <Box
          marginBottom={4}
          sx={{
            p: 3,
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow:'0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
            transform: 'translateY(-50%)',
            transition: 'transform 0.5s',
            '&:hover': {
              transform: 'translateY(-48%)',
            },
          }}
        >
          <Typography variant={'h1'} component="p" color="error" gutterBottom>
            404
          </Typography>
          <Typography variant={'h5'} color="textSecondary">
            {"Oops! The page you're looking for isn't here."}
          </Typography>
          <Box marginTop={4}>
            <Button variant="contained"
              sx={{backgroundColor: 'black', '&:hover': {
                backgroundColor: 'rgb(0,0,0,0.8)'
              }}}
              href="/" size="large">
              Go Home
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </main>
  </>

  )
}