import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PersonIcon from "@mui/icons-material/Person";
// import BookIcon from "@mui/icons-material/Book";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  const router = [
    {
      route: "home",
      label: "Parcels",
      icon: <LocationOnIcon />,
    }
    // {
    //   route: "users",
    //   label: "Users",
    //   icon: <PersonIcon />,
    // },
    // {
    //   route: "posts",
    //   label: "Posts",
    //   icon: <BookIcon />,
    // },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {router.map((nav) => {
          return (
            <BottomNavigationAction
              value={nav.route}
              key={nav.route}
              {...nav}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
