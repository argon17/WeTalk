import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
          '@global': {
             body: {
               background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
               backgroundRepeat: "no-repeat",
               backgroundAttachment: "fixed",
            },
          },
        },
      },
    palette:{
        type: "dark",
        primary: {
            main: "#2C5364",
        } ,
        secondary: {
            main: "#ffffff"
        }
    },
    typography: {
        fontFamily: 'Ubuntu',
    }
});

export default theme;