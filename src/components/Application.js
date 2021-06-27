import React, {useState, useEffect} from 'react';
import { db, auth } from '../Firebase/Firebase';
import { 
    makeStyles, 
    Hidden, 
    Drawer, 
    Toolbar, 
    Typography, 
    Divider, 
    Avatar, 
    CssBaseline,
    AppBar, 
    IconButton, 
    Menu, 
    MenuItem,
    Fade,
    Snackbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import logo from "../assets/logo.png"
import theme from '../theme';
import Channels from './Channels';
import EditProfile from './EditProfile';
import CloseIcon from '@material-ui/icons/Close';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';
import Join from './Join';

const drawerWidth = 300;

const useStyles = makeStyles(theme=>({
    logo:{
        height:50,
        objectFit: 'contain'
    },
    avatar:{
        height:25,
        objectFit: 'contain'
    },
    header:{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        flexGrow:1
    },
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        color: "white",
    },
    // you very noob biro, itna pareshaan kraya harami
    content: {
        marginTop: "64px",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        width: '100%'
    },
    menu: {
        "& .MuiPaper-root": {
          backgroundColor: theme.palette.primary.main
        }
    }
}));

const Application = ({ window, uid }) => {

    const classes = useStyles();
    const [userDetails, setUserDetails] = useState([]);
    const [editProfileModel, setEditProfileModel] = useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        db.collection("users")
          .doc(uid)
          .onSnapshot((doc) => {
            setUserDetails(doc.data());
            localStorage.setItem("userDetails", JSON.stringify(doc.data()));
          });
        return () => {
        setUserDetails([]); // This worked for me
        };
    }, [uid]);

    const signOut = () => {
        auth
        .signOut()
        .then(() => {
        console.log("signed out");
        localStorage.clear();
        })
        .catch((err) => {
        console.log(err);
        });
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const toggleEditProfile = () => {
        setEditProfileModel(!editProfileModel);
    };

    const handleAlert = () => {
        setAlert(!alert);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const drawer = userDetails && (
        <div className={classes.side_toolBar}>
          <Toolbar className={classes.header}>
            <Typography variant="h6" className={classes.sideToolBarText}>
              {userDetails.displayName}
            </Typography>
            <Avatar alt={userDetails.name} src={userDetails.imgURL} />
          </Toolbar>
          <Divider />
          <Channels user ={uid}/>
          <Divider />
        </div>
      );

   

    return (
        userDetails ? 
        <div className={classes.root}>
            <Router basename="/">
                <CssBaseline />
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={alert}
                    onClose={handleAlert}
                    TransitionComponent={Fade}
                    message="Display Name Updated Successfully"
                    key={Fade}
                    action={
                    <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
                        <CloseIcon />
                    </IconButton>
                    }
                />

                {editProfileModel ? 
                (<EditProfile toggle={toggleEditProfile} alert={handleAlert} />) : 
                null}

                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                    <MenuIcon />
                    </IconButton>
                        <div className={classes.header}>
                            <img src={logo} alt="logo" className={classes.logo}/>
                            <IconButton onClick={handleClick} >
                                <Avatar alt={userDetails.name} src={userDetails.imgURL}/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                className={classes.menu}
                            >
                                <MenuItem onClick={toggleEditProfile}>
                                Edit Profile
                                </MenuItem>
                                <MenuItem onClick={signOut}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="chat room folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                    </Hidden>

                    <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                    </Hidden>
                    
                </nav>
                <main className={classes.content}>
                    <Switch>
                        <Route path="/" exact>
                            <Home user ={uid} />
                        </Route>
                        <Route path="/channel/:id">
                            <Chat />
                        </Route>
                        <Route path="/join/:id">
                            <Join/>
                        </Route>
                    </Switch>
                </main>
            </Router>
        </div> : <>Loading...</>
    )
}

export default Application