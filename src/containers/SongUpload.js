import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {signUp} from '../store/actions/authActions'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import {SignupComponent} from "./SignupComponent";
import {upload} from '../store/actions/songUploadActions'


const styles = (theme) => ({
    textField: {
        minWidth: 280,
        marginTop: 20
    },
    contain: {
        margin: '0 auto'
    },
    paper: {
        minHeight: 370,
        maxWidth: 450,
        minWidth: 337,
        textAlign: 'center',
        display: 'block',
        margin: 'auto'
    }
})

export class SongUploadComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            songNameInput: '',
            songNameInputError: '',
            artistNameInput: '',
            artistNameInputError: '',
            priceInput: '',
            priceInputError: '',
            songFileInput: '',
            songFileInputError: ''
        }
        this.handleForm = this.handleForm.bind(this)
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
            [name]: value
        })

        switch (name) {
            case 'songNameInput':
                this.setState({
                    songNameInputError: ''
                })
                break
            case 'artistNameInput':
                this.setState({
                    artistNameInputError: ''
                })
                break
            case 'priceInput':
                this.setState({
                    priceInputError: ''
                })
                break
            case 'songFileInput':
                this.setState({
                    songFileInputError: ''
                })
                break
            default:

        }
    }

    handleForm = () => {

        const { songNameInput, artistNameInput, priceInput, songFileInput}= this.state
        const { register } = this.props

        let error = false

        // Validate full name
        let songNameCheck = songNameInput.trim().toLowerCase()

        if (songNameCheck.length < 2) {
            this.setState({
                songNameInputError: 'Please enter a valid song name'
            })
            error = true
        }

        /* Check artist name */
        if (artistNameInput === '') {
            this.setState({
                artistNameInputError: 'Please enter a valid artist name'
            })
            error = true
        }

       /* Check artist name*/
        let intPrice = parseInt(priceInput)


        if (isNaN(intPrice)) {
            if (intPrice && intPrice > 1) {
                this.setState({
                    priceInputError: 'Please enter a valid a price'
                })
                error = true
            }
        }

        if (!error) {
            register({
                title: songNameInput,
                artistName: artistNameInput,
                price: priceInput,
            })
        }
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    render() {

        const { classes, auth } = this.props
        if (auth.uid){
            this.props.history.push('/')
            return <Redirect to='/' />
        }

        return (
            <Grid container spacing={24}>
                <Grid item xs={12} className={classes.contain}>
                    <div>
                        <Paper className={classes.paper} elevation={1} >
                            <div style={{ padding: '48px 40px 36px' }}>
                                <div style={{ paddingLeft: '40px', paddingRight: '40px'}}>
                                    <h2>bMusic Song Upload</h2>
                                </div>
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    onChange={this.handleInputChange}
                                    helperText={this.state.songNameInputError}
                                    error={this.state.songNameInputError.trim() !== ''}
                                    name='songNameInput'
                                    label='Song Name'
                                    type='text'
                                /><br />
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    onChange={this.handleInputChange}
                                    helperText={this.state.artistNameInputError}
                                    error={this.state.artistNameInputError.trim() !== ''}
                                    name='artistNameInput'
                                    label='Artist Name'
                                    type='text'
                                /><br />
                                <TextField
                                    className={classes.textField}
                                    onChange={this.handleInputChange}
                                    helperText={this.state.priceInputError}
                                    error={this.state.priceInputError.trim() !== ''}
                                    name='priceInput'
                                    label='Price'
                                    type='text'
                                /><br />
                                <br />
                                <div>
                                    <div>
                                        <input
                                               onChange={this.handleInputChange}
                                               error={this.state.songFileInputError.trim() !== ''}
                                               accept='.mp3'
                                               name='songFileInput'
                                               type="file"
                                        />
                                    </div>
                                    <div>
                                        <Button variant='contained' color='primary' onClick={this.handleForm}>Upload Song</Button>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        upload: (userRegister) => {
            dispatch(upload(userRegister))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongUploadComponent))
