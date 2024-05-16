"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { signOut } from "next-auth/react"
import BrushIcon from '@mui/icons-material/Brush';
import Link from 'next/link';
import PhotoIcon from '@mui/icons-material/Photo';
import HardwareIcon from '@mui/icons-material/Hardware';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <AppRouterCacheProvider>
      <AdminDashboard>
        {children}
        </AdminDashboard>
      </AppRouterCacheProvider>
  );
}

const PRIMARY_NAV_ITEMS: {text: string, icon: React.ReactNode,href: string }[] = [
  {text: 'Images', icon: <PhotoIcon/>, href: "/admin"},
  {text: 'Finishes', icon: <BrushIcon/>, href: "/admin/finishes"},
  {text: 'Materials', icon: <HardwareIcon/>, href: "/admin/materials"},
  {text: 'Production Types', icon: <PrecisionManufacturingIcon/>, href: "/admin/productionTypes"}
];

const SECONDARY_NAV_ITEMS: {text: string, icon: React.ReactNode,href: string }[] = [
  {text: 'Products', icon: <ShoppingCartIcon />, href: "/admin/product-listing"},
];


function AdminDashboard({
  children,
}: {
  children: React.ReactNode
}){
  const theme = useTheme();
  const zIndex = theme.zIndex.drawer + 1;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = isMobile ? 100 : 240;
  
  return <Box sx={{ display: 'flex' }}>
  <CssBaseline />
  <AppBar position="fixed" sx={{ zIndex: zIndex }}>
    <Toolbar style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Pilot Controls
      </Typography>
    <Button style={{float: "right"}} color="inherit" onClick={() => signOut({callbackUrl: `${window.location.origin}` })}>Logout</Button>
    </Toolbar>
  </AppBar>
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {PRIMARY_NAV_ITEMS.map(({text, icon, href}, index) => (
                        <Link key={text} href={href}>
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {SECONDARY_NAV_ITEMS.map(({text, icon, href}, index) => (
              <Link key={text} href={href}>
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  </Drawer>
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Toolbar />
    {children}
  </Box>
</Box>
}