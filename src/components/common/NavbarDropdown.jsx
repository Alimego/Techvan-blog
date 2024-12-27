import NavbarIcon from "../utils/icons/NavbarIcon";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../hooks/slugify'; // Assuming you have this

export default function NavbarDropdown() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCategoryClick = (category) => {
    if (category === 'Jobs') {
      navigate('/jobs'); // Redirect to the /job page for "Jobs"
    } else {
      const slug = slugify(category);
      navigate(`/category/${slug}`); // Redirect to slugified category page for others
    }
    setOpen(false); // Close drawer after navigating
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Artificial Intelligence', 'Blockchain', 'Cybersecurity', 'Events', 'Hardware', 'Jobs', 'Software', 'Startups'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <div className="cursor-pointer" onClick={toggleDrawer(true)}><NavbarIcon /></div>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
