import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux'

const styles = theme => ({
  paper: {
    width:'80%', 
    marginTop: '20px',
    justify: 'center', 
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,    
    width: '100%',
  },
  image: {
    height:150, 
    width: 'auto'
  }, 
  tablecell: {
    fontSize: '20pt', 
    marginTop: 50
  }

});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingRight: '100px'
  },
  body: {
    fontSize: 50,
  },
}))(TableCell);

export class SongList extends Component {
  render() {
    const {classes, songs, artistPage  } = this.props
    if (songs) {
        return (
          <Grid container justify="center"> 
          <Paper className={classes.paper}>
                <Table className={classes.table}> 
                  <colgroup>
                    <col style={{width:'5%'}}/>
                    <col style={{width:'19%'}}/>
                    <col style={{width:'19%'}}/>
                    <col style={{width:'19%'}}/>
                    <col style={{width:'19%'}}/>
                   </colgroup>
              <TableHead>
              <TableRow>
                <CustomTableCell align="center" >Song</CustomTableCell>
                <CustomTableCell align="right">Artist</CustomTableCell>
                <CustomTableCell align="right">Price</CustomTableCell>
                <CustomTableCell align="right">% Royalty</CustomTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  { songs && songs.map(song => (
                  <TableRow key={song.id} className={classes.tablecell}>
                  <TableCell>
                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                          <img className={classes.image} src ={song.cover} />
                        </Grid>
                      <Grid item xs zeroMinWidth alignContent="center">
                        <Typography className={classes.tablecell}>{song.title}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                    <TableCell align="right" className={classes.tablecell} >{song.artist || 'anonymous'}</TableCell>
                    <TableCell align="right" className={classes.tablecell} style={{paddingRight: '120px'}}> {song.price}$ </TableCell>
                    <TableCell align="right">{song.remainingShare}% </TableCell>
                  </TableRow>          
                  ))}
            </TableBody>
            </Table>
          </Paper>
          </Grid>
          )

      
    } else {
      return ( 
        <div> </div>
      )}
  
    }}

const mapStateToProps = (state) => {
  return {
    songs: state.firestore.ordered.songs
  }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'songs'
     // ordrerBy
    }]), 
    withStyles(styles)
  )(SongList)