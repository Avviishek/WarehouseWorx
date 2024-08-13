/**
=========================================================
* WarehouseWorx React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// WarehouseWorx React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// WarehouseWorx React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<Icon>warning</Icon>}
        title="Alert: Stock for Item #A1234 (Blue Widgets) is below threshold. Current Sales: 10 units. Please reorder urgently."
      />
      <NotificationItem
        icon={<Icon>storage</Icon>}
        title="Warning: Stock for Item #B5678 (Red Gadgets) exceeds warehouse capacity. Current Sales: 500 units. Please manage storage."
      />
      <NotificationItem
        icon={<Icon>schedule</Icon>}
        title="Notice: 100 units of Item #C9101 (Organic Milk) near expiration on 2024-08-25. Prioritize these for outgoing orders."
      />
      <NotificationItem
        icon={<Icon>event_note</Icon>}
        title="Reminder: It's time to reorder Item #D2345 (Packing Tape). Only a one-week supply remains."
      />
      <NotificationItem
        icon={<Icon>local_shipping</Icon>}
        title="New Order: Order #78910 placed by Customer XYZ. Process within the next 3 hours."
      />
      <NotificationItem
        icon={<Icon>playlist_add_check</Icon>}
        title="Order Picked: Items for Order #78910 have been picked and are ready for packing. Proceed to the packing station."
      />
      <NotificationItem
        icon={<Icon>done</Icon>}
        title="Order Packed: Order #78910 has been packed and is ready for shipping. Dispatch scheduled for today at 5 PM."
      />
      <NotificationItem
        icon={<Icon>local_shipping</Icon>}
        title="Order Shipped: Order #78910 has been shipped via Carrier FedEx. Tracking number: 9876543210. Expected delivery: 2024-08-17."
      />
      <NotificationItem
        icon={<Icon>local_shipping</Icon>}
        title="Incoming Shipment: Shipment #54321 from Supplier ABC arriving at Dock 2 at 9 AM tomorrow. Contents: 400 units of Item #A1234."
      />
      <NotificationItem
        icon={<Icon>build</Icon>}
        title="Maintenance Notice: The WMS will undergo scheduled maintenance on 2024-08-16 from 2 AM to 4 AM. Please plan accordingly."
      />
      <NotificationItem
        icon={<Icon>thermostat</Icon>}
        title="Temperature Alert: The cold storage area is running at 6°C, exceeding the safe limit. Immediate action required."
      />
      <NotificationItem
        icon={<Icon>security</Icon>}
        title="Security Alert: Unauthorized access detected in Warehouse Zone 3 at 2:30 AM. Security personnel have been notified."
      />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1].replace(/_/g, " ")}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/*<MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>*/}
            <MDBox color={light ? "white" : "inherit"}>
              {/*<Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>*/}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/*<IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>*/}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
