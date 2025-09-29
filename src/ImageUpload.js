// React hooks for state, side effects, and memoized functions
import { useState, useEffect, useCallback } from "react";
// Material-UI styling utilities
import { makeStyles, withStyles } from "@material-ui/core/styles";
// Material-UI components for layout and UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
// Images for logo and background
import cblogo from "./Mazali Logo.png";
import image from "./back.jpeg";
// Dropzone for file upload
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';


// Custom styled button using Material-UI
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#4965ca7a',
    },
  },
}))(Button);

// Axios for HTTP requests
const axios = require("axios").default;

// Styles for all UI elements using Material-UI's makeStyles
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  auimageCardEmpty: {
    height: 'to',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#3d2314ff',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#1fcb86ff !important',
  }
}));
// Main component for image upload and prediction UI
export const ImageUpload = () => {
  const classes = useStyles(); // Use the styles
  // State for the selected file
  const [selectedFile, setSelectedFile] = useState();
  // State for the preview image URL
  const [preview, setPreview] = useState();
  // State for the prediction result from backend
  const [data, setData] = useState();
  // State to check if an image is selected
  const [image, setImage] = useState(false);
  // State for loading spinner
  const [isLoading, setIsloading] = useState(false);
  // Confidence value for prediction
  let confidence = 0;

  // Function to send the selected file to the backend API
  // Wrapped in useCallback to avoid React warnings
  const sendFile = useCallback(async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      // Log the API URL for debugging
      console.log('API URL:', process.env.REACT_APP_API_URL);
      // Send POST request to backend
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      // If successful, update the data state
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }, [image, selectedFile]);
  // Function to clear all states (reset the UI)
  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  // When a file is selected, create a preview URL for it
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  // When preview changes (i.e., a new file is selected), send the file to the backend
  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview, sendFile]);

  // Handler for when a user selects a file in the dropzone
  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  // Calculate confidence percentage if data is available
  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }
useEffect(() => {
  if (!preview) {
    return;
  }
  setIsloading(true);
  sendFile();
}, [preview, sendFile]);
  // Render the UI
  return (
    <React.Fragment>
      {/* AppBar for the top navigation/header */}
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Car Brand Prediction: DL Project
          </Typography>
          <div className={classes.grow} />
          {/* Logo avatar */}
          <Avatar src={cblogo}></Avatar>
        </Toolbar>
      </AppBar>
      {/* Main container with background image */}
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            {/* Card for image upload and results */}
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {/* Show preview if image is selected */}
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {/* Show dropzone if no image is selected */}
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a Car to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {/* Show prediction results if available */}
              {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {/* Show loading spinner while processing */}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {/* Show clear button if data is available */}
          {data &&
            <Grid item className={classes.buttonGrid} >
              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
    </React.Fragment >
  );
};
