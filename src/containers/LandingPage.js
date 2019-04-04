import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// import project components
import SongBoxGrid from '../components/SongBoxGrid'


import coverArt from '../img/albumArt.png'
import coverArtTwo from '../img/tameImpala.jpg'

const styles = {
  infoSectionContainer: {
    position: 'relative',
    display: 'flex',
    margin: 'none',
    width: '100%',
    padding: "5% 0%"
  },
  infoSectionContainer2: {
    position: 'relative',
    display: 'flex',
    margin: 'none',
    backgroundColor: '#f2f3f4',
    width: "100%",
    padding: "5% 0%"

  },
  infoSection: {
    display: 'flex',
    "flex-direction": "column",
    margin: "0 5%",
    "align-content": "space-around",
    "justify-content": "center"
  },
  svg:{
    left: "5%",
  },
  footerContainer:{
    position: 'relative',
    display: 'flex',
    margin: 'none',
    backgroundColor: 'lightgrey',
    width: '100%',
    padding: "5% 0%",
    "flex-direction": "row",
    "justify-content": "space-around"
  },
  footerSection:{
    display: "flex"
  },
  socialIcons:{
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-around",
    width: "40%"
  },
  siteInfo:{
    display: "flex",
    "flex-direction":"column"
  },
  subtitle: {
    fontSize: 25,
    color: "#358ED7",
    letterSpacing: "1px",
    textTransform: "uppercase",
    textDecoration: "none"
  },
  title: {
    fontWeight: 300,
    fontSize: 40,
    color: "#43484D",
    letterSpacing: "-2px"
  },
  button: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    width: 300,
    color: 'white !important',
    marginTop: 20,
    fontSize: 16

  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#86939E",
    letterSpacing: "-1px",
    fontWeight: 300,
    lineHeight: "24px"
  },
}

export class LandingPage extends Component {
  render() {
    const { classes } = this.props
    const songs = {
      '1': {
        artist: 'Artist 1',
        title: 'song 1',
        coverArt: coverArt
      },
      '2': {
        artist: 'Tame Impala',
        title: 'The Moment',
        coverArt: coverArtTwo
      },
      '3': {
        artist: 'Artist 3',
        title: 'song 3',
        coverArt: coverArt
      },
      '4': {
        artist: 'Artist 4',
        title: 'song 4',
        coverArt: coverArtTwo
      },
      '5': {
        artist: 'Artist 5',
        title: 'song 5',
        coverArt: coverArt
      },
      '6': {
        artist: 'Artist 6',
        title: 'song 6',
        coverArt: coverArt
      }
    }
    return (
      <div className={classes.root}>
        <div  className={classes.infoSectionContainer}>
          <div className={classes.infoSection}>
            <div className={classes.infoSubSection}>
              <Typography variant="h3" className={classes.title}>Get your Favorite Songs</Typography>
              <br></br>
              <Typography variant="p" className={classes.description}>Buy songs that you love directly from artists. Listen to them whenever you want.</Typography>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className={classes.infoSubSection}>
              <Typography variant="h4" className={classes.subtitle}>Are you also an artist?</Typography>
              <br></br>
              <Typography variant="p" className={classes.description}>Upload your songs and directly sell them to your fans. Split payments between owners without the need of intermediaries.</Typography>
            </div>
          </div>
          <div className={classes.infoSection}>
            <SongBoxGrid songs={songs}/>
          </div>
        </div>
        <div className={classes.infoSectionContainer2}>
          <div className={classes.infoSection}>
                <svg className={classes.svg} width="373px" height="200px" viewBox="0 0 200 107" version="1.1">
                  <defs>
                      <linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id="linearGradient-1">
                          <stop stop-color="#2090F8" offset="0%"></stop>
                          <stop stop-color="#01FCE4" offset="41.7610013%"></stop>
                          <stop stop-color="#0BFF8C" offset="78.6870217%"></stop>
                          <stop stop-color="#51FF00" offset="100%"></stop>
                      </linearGradient>
                  </defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketchType="MSPage">
                      <path d="M2.10546875,95.75
                       L40.5546875,68.3476562 
                       L55.2109375,81.1796875 
                       L65.2148437,76.3945312 
                       L96.1835937,86.8320312 
                       L131.023438,19.9414062 
                       L142.15625,23.7226562 
                       L183.605469,2.1953125"
                       id="Path-1" stroke="url(#linearGradient-1)" stroke-width="6" sketchType="MSShapeGroup"></path>
                  </g>
              </svg>
          </div>
          <div className={classes.infoSection}>
            <div className={classes.infoSubSection}>
              <Typography variant="h2" className={classes.title}>Invest in Music</Typography>
              <br></br>
              <Typography variant="p" className={classes.description}>Buy and sell phonogram royalties of your favorite songs. Pre-register owners and get funded for your music</Typography>
            </div>
          </div>
        </div>
        <div className={classes.footerContainer}>
          <div className={classes.footerSection}>
            <ul className = {classes.siteInfo} style={{"list-style-type": "none", textAlign: "start"}}>
              <a href=""><li><Typography variant="p" className={classes.description}>About bMusic</Typography></li></a>
              <a href=""><li><Typography variant="p" className={classes.description}>Contact us</Typography></li></a>
              <a href=""><li><Typography variant="p" className={classes.description}>Privacy, Terms and Conditions</Typography></li></a>
            </ul>
          </div>
          <div className={classes.footerSection}>
            <div className = {classes.socialIcons}>
 
              <a href="" style={{margin: "100%"}}><svg role="img" height="25px" width="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook icon</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/></svg></a>
              <a href="" style={{margin: "100%"}}><svg role="img" height="25px" width="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram icon</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
              <a href="" style={{margin: "100%"}}><svg role="img" height="25px" width="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg></a>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(LandingPage))