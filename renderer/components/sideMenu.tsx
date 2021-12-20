import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

import MUILink from '@mui/material/Link';
import Link from 'next/link'



export default function IconMenu() {
  const onOpenDevTools = () => {
    global.ipcRenderer.send('OPEN_DEV_TOOLS')
  }
  return (
      <MenuList>
        <Link href="/">
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Details</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Insert Data</ListItemText>
        </MenuItem>
        <Divider />

          <MenuItem onClick={onOpenDevTools}>
          <ListItemIcon>
              <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>DevTools</ListItemText>
          </MenuItem>

        <Link href="/settings" passHref>
        <MenuItem>
          <ListItemIcon>
              <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
  );
}