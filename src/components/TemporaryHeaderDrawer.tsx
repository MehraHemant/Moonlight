"use client"
import { CATEGORIES } from '@/constants';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import HardwareIcon from '@mui/icons-material/Hardware';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import CallIcon from '@mui/icons-material/Call';
import GradeIcon from '@mui/icons-material/Grade';
import GradientIcon from '@mui/icons-material/Gradient';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


export function TemporaryHeaderDrawer() {
  const [state, setState] = React.useState(false);
  const [hardwareMenuExpanded, setHardwareMenuExpanded] = React.useState(true);
  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        if(!open) {setHardwareMenuExpanded(false);}
        setState(open);
      };


      const handleHardwareMenuClick = () => {
        setHardwareMenuExpanded(!hardwareMenuExpanded);
      };
    

  const list = () => (
      <List
      sx={{width: '300px'}}
      >
      <ListItem key={'Home'} disableGutters>
            <ListItemButton component="a" href='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
      </ListItem>

      <ListItemButton onClick={handleHardwareMenuClick}>
        <ListItemIcon>
          <HardwareIcon />
        </ListItemIcon>
        <ListItemText primary="Hardware" />
        {hardwareMenuExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>


      <Collapse in={hardwareMenuExpanded} timeout="auto" unmountOnExit>
        <List component="div">
        {Object.keys(CATEGORIES[0]).map((cname) => {
          return <ListItemButton component="a" href={`/${cname.replaceAll(' ', '-')}/builders-hardware-manufacturers`} key={cname} sx={{ pl: 4 }}>
            <ListItemText inset primary={cname} />
          </ListItemButton>
        })}

        </List>
      </Collapse>

      <ListItem key={'Material'} disableGutters>
            <ListItemButton component="a" href={'/architectural-builders-hardware-fitting-materials'}>
              <ListItemIcon>
                <ArchitectureIcon />
              </ListItemIcon>
              <ListItemText primary={'Material'} />
            </ListItemButton>
      </ListItem>

      <ListItem key={'Finishes'} disableGutters>
            <ListItemButton  component="a" href='/architectural-builders-hardware-finishes'>
              <ListItemIcon>
                <GradientIcon />
              </ListItemIcon>
              <ListItemText primary={'Finishes'} />
            </ListItemButton>
      </ListItem>

      <ListItem key={'Featured'} disableGutters>
            <ListItemButton  component="a" href='/featured'>
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary={'Featured'} />
            </ListItemButton>
      </ListItem>

      <ListItem key={'About Us'} disableGutters>
            <ListItemButton  component="a" href='/about-us'>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary={'About Us'} />
            </ListItemButton>
      </ListItem>

      <ListItem key={'Contact'} disableGutters>
            <ListItemButton component="a" href='/contact'>
              <ListItemIcon>
                <CallIcon />
              </ListItemIcon>
              <ListItemText primary={'Contact'} />
            </ListItemButton>
      </ListItem>
      </List>
  );

  return (
    <div>
      <React.Fragment>
        <Button sx={{color: "white"}} onClick={toggleDrawer(true)}>
        <MenuIcon/>
          </Button>
        <Drawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
