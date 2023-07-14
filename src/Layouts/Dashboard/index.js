// import { styled } from '@mui/material/styles';
// import { SideNav } from './side-nav';
import TopNav from './TopNavbar';
// import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { Outlet } from "react-router-dom";

// const SIDE_NAV_WIDTH = 280;

export default function Dashboard (props) {
  // const { children } = props
  const [openNav, setOpenNav] = useState(true);

  // const LayoutRoot = styled('div')(({ theme }) => ({
  //   display: 'flex',
  //   flex: '1 1 auto',
  //   maxWidth: '100%',
  //   [theme.breakpoints.up('lg')]: {
  //     paddingLeft: SIDE_NAV_WIDTH
  //   }
  // }));
  
  // const LayoutContainer = styled('div')({
  //   display: 'flex',
  //   flex: '1 1 auto',
  //   flexDirection: 'column',
  //   width: '100%'
  // });

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );
  
  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ ]
  );

  return (
    <>
      <div id="detail" style={{ paddingBottom: '50px' }}>
        <Outlet />
      </div>
      <TopNav onNavOpen={() => setOpenNav(true)} />
    </>
  );
}

