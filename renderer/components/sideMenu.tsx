import * as React from 'react';
import { useState, useEffect } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from '@mui/material/styles';

import Cloud from '@mui/icons-material/Cloud';

import MUILink from '@mui/material/Link';
import Link from 'next/link'



export default function IconMenu() {

  const [menudata, _menudata] = useState([])

  const onToggleDevTools = () => {
    global.ipcRenderer.send('TOOGLE_DEV_TOOLS')
  }

  const WhiteText = styled('div')(({ theme }) => ({
    color: 'white',
  }))
  

  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_SYSTEM_MENU', (_event, data) => {
      return _menudata(data)})
    global.ipcRenderer.send('REQUEST_DATA', 'SYSTEM_MENU')

  }, [])

  
  return (
      <MenuList>
          {
            menudata.map((item,i) => {
              return(
              <Link key={`key-${item[0]}-${i}`} href={item[0]}>
              <MenuItem>
                {item[3] && (
                  <ListItemIcon>
                    <WhiteText><i className={`${item[2]} ${item[3]}`} /></WhiteText>
                  </ListItemIcon>
                )}
                <ListItemText>{item[1]}</ListItemText>
              </MenuItem>
            </Link>
            )})
          }
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Projects</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Insert Data</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onToggleDevTools}>
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