import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import SvgShare from "@material-ui/icons/Share";
import SvgComment from "@material-ui/icons/Comment";
import SvgFavorite from "@material-ui/icons/Favorite";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import SvgFavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Zoom from "@material-ui/core/Zoom";
import styled from "@emotion/styled/macro";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import {
  dbDeleteSong,
  dbPurchaseSong,
  dbPutSongForSale,
  dbRemoveSongForSale
} from "../store/actions/songActions";

const styles = theme => ({
  textField: {
    minWidth: 280,
    marginTop: 20
  },
  contain: {
    margin: "0 auto"
  },
  titleFrame: {
    position: "relative",
    top: 10,
    left: 10,
    width: 255
  },
  coverArtFrame: {
    position: "relative",
    left: 95,
    bottom: 90,
    maxHeight: 70,
    width: 70,
    backgroundColor: "grey"
  },
  myStats: {
    position: "relative",
    bottom: 70,
    right: 80
  },
  title: {},
  button: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    "&:hover": {
      border: "solid 3px white",
      color: "white !important"
    },
    top: 100
  },
  sellArea: {
    margin: "auto"
  },
  paper: {
    height: 550,
    width: 450,
    textAlign: "center",
    display: "block",
    margin: "auto"
  }
});

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      percentValue: 1,
      price: null,
      priceInputError: "",
      priceUSD: 0,
      priceInUSD: 0
    };
  }

  componentDidMount(){
     //convert Eth to USD
     const proxyurl = "https://cors-anywhere.herokuapp.com/";
     const url = "https://api.coinmarketcap.com/v1/ticker/ethereum"; // site that doesn’t send Access-Control-*
     fetch(proxyurl + url)
     .then(res => {
       return res.clone().json();
     })
     .then(
       result => {
         console.log("The result is:", result);
         this.setState({
           isLoaded: true,
           priceUSD: result[0].price_usd
         });
       },
       error => {
         console.log(error);
       }
     ).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
  }

  handleSlider = (event, percentValue) => {
    this.setState({ percentValue });
  };

  handlePriceChange = event => {
    const target = event.target;
    this.setState({
      price: target.value,
      priceInUSD: target.value * this.state.priceUSD
    });
  };

  handlePutForSale = () => {
    const { sellSong, song, songId, auth, drizzleState } = this.props;
    const ownerDetails = song["ownerDetails"];
    const { price, percentValue } = this.state;
    let sellAllShares = false;
    if (song.market.percent === percentValue) {
      sellAllShares = true;
    }
    let error = false;

    let intPrice = parseInt(price);
    if (isNaN(intPrice)) {
      if (!intPrice || intPrice <= 0) {
        this.setState({
          priceInputError: "Please enter a valid price"
        });
        error = true;
      }
    }

    if (!error) {
      this.sellRoyalties(songId, percentValue, price).then((txHash)=>{
        //display txHash as receipt of the transaction
        console.log('Putting ', percentValue, 'percent up for sale at $', intPrice, ' per percentage point')
        const callBack = () => {
          this.props.closeModal()
        }
        const sellerAddress = drizzleState.accounts[0];
        sellSong(song, songId, percentValue, intPrice, sellAllShares, sellerAddress, callBack)
      }).catch(error=>{
        console.log(error);
      });
    }
  }

  sellRoyalties(songId, percentValue, price){

    //Is songId the songAddress?
    const royalties = percentValue * 100;
    const pricePerPoint = price / royalties;

    return new Promise((resolve, reject) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.SongsContract;

      

      //Remove this when songAddress is added to the database
      songId = '0xAE20d508d2F30666FfdE8c3e5D30e9b09Eb5Bb25';

      if(drizzleState.drizzleStatus.initialized){
          contract.methods.sellRoyalties(songId, royalties, pricePerPoint).send({from: drizzleState.accounts[0], gas: 4712388,},
              function(error, result){
                  if(error){
                      console.log(error);
                      reject(error);
                  } else{
                      console.log("TX hash is " + result);
                      resolve(result);
                  }
              }                
          );
      }
    });  
  }

  submitWithdraw(){
    return new Promise((resolve, reject) => {
    const {songId, song, drizzle, drizzleState, auth} = this.props;
    const market = song['market'];
    const contract = drizzle.contracts.SongsContract;

    //Remove this when songAddress is added to the database
    const songAddress = '0xAE20d508d2F30666FfdE8c3e5D30e9b09Eb5Bb25';
    const royalties = market[auth.uid].percent * 100;

    console.log("remove offer is doing something");
    if(drizzleState.drizzleStatus.initialized){

      console.log("remove offer is not initialized");
        contract.methods.withdrawOffer(songAddress, royalties).send({from: drizzleState.accounts[0], gas: 4712388,},
            function(error, result){
                if(error){
                    console.log(error);
                    reject(error);
                } else{
                    console.log("TX hash is " + result);
                    resolve(result);
                }
            }                
        );
    }

  });
}

handleRemoveFromSale = () =>{
    const callBack = () => {
      this.props.closeModal()
    }
    const {songId, song} = this.props;

    this.submitWithdraw().then((txHash)=>{
      //display tx hash as receipt of the transaction
      this.props.removeForSale(song, songId, callBack);
    }).catch((error)=>{
      console.log(error);
    });

  }


  render() {
    const { songId, song, classes, theme, auth, drizzleState, totalPercent } = this.props;
    const title = song["title"];
    const artist = song["artistName"];
    const coverArt = song["imageUrl"];
    const media = song["songUrl"];
    const ownerDetails = song["ownerDetails"];
    const market = song["market"];
    const cardSize = 130;
    const titleSize = 14;
    const subtitleSize = 12;
    const iconSize = 30;
    const callBack = () => {
      this.props.closeModal();
    };

    console.log("song Details props: ", this.props.song);
    console.log("song ownerDetails", song["ownerDetails"]);
    return ( 
      <Grid container spacing={24} style={{ overflow: "hidden" }}>
        <Grid item xs={12} className={classes.contain}>
          <div>
            <Paper className={classes.paper} elevation={1}>
              <div className={classes.titleFrame}>
                <h2 className={classes.title}>{title}</h2>
                <h4 className={classes.artist}>{artist}</h4>
              
              </div>
              <hr />
              <img className={classes.coverArtFrame} src={coverArt} />

              {auth? (
                market && market[auth.uid] ? (
                  <div style={{ position: "relative", right: 40, bottom: 60 }}>
                    <Typography>
                      You own { totalPercent - market[auth.uid].percent}%
                    </Typography>
                    <div
                      style={{
                        position: "relative",
                        width: 350,
                        left: 46,
                        top: 15
                      }}
                    >
                      You are selling {market[auth.uid].percent}% for $
                      {(market[auth.uid].price*this.state.priceUSD).toLocaleString()}
                    </div>
                    <Button
                      style={{ position: "relative", top: 25 }}
                      variant="contained"
                      color="primary"
                      onClick={
                        this.handleRemoveFromSale
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                  
                  </div>
                )
              ) : (
                ""
              )}
                <div className={classes.sellArea}>
                      <Typography variant="h5"> Sell Your Shares: </Typography>
                      <div style={{ position: "relative", left: 125, top: 40 }}>
                        <Slider
                          step={1}
                          style={{ width: 200 }}
                          aria-labelledby="label"
                          onChange={this.handleSlider}
                          value={this.state.percentValue}
                          max={song.market[auth.uid].percent}
                          min={1}
                        />
                        <div style={{ position: "relative", bottom: 10 }}>
                          {this.state.percentValue}%
                        </div>
                      </div>
                      <TextField
                        style={{
                          position: "relative",
                          left: 5,
                          width: 100,
                          top: 20
                        }}
                        onChange={this.handlePriceChange}
                        helperText={this.state.priceInputError}
                        error={this.state.priceInputError.trim() !== ""}
                        name="priceInput"
                        label="Price (ETH)"
                        type="number"
                      />
                      <Button
                        style={{ position: "relative", top: 40, left: 30 }}
                        variant="contained"
                        color="primary"
                        onClick={this.handlePutForSale}
                      >
                        Sell Song
                      </Button>
                      <Typography variant="p" style={{
                          position: 'relative',
                          width: 200,
                          top: 40,
                          left: 135
                          
                        }}>
                        This is equivalent to ${(this.state.priceInUSD).toLocaleString()}
                        </Typography>
                    </div>
              <Button
                className={classes.button}
                onClick={() => this.props.viewDetails(song.id)}
              >
                View Song Details
              </Button>
            </Paper>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { history } = state;
  return {
    history: history,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewDetails: id => {
      ownProps.history.push(`/song/${id}`);
    },
    sellSong: (song, songId, percent, price, sellAllShares, sellerAddress, callBack) =>
      dispatch(
        dbPutSongForSale(song, songId, percent, price, sellAllShares, sellerAddress, callBack)
      ),
    removeForSale: (song, songId, callBack) =>
      dispatch(dbRemoveSongForSale(song, songId, callBack))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(SongDetails))
);
