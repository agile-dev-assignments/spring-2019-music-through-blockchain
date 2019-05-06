import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const styles = theme => ({
})
const SignedInLinks = (props) => {
    return (
        <div style={{position: 'relative', top: 55 }}>
            <h3 style={{display:'inline', padding: 15}}><NavLink to='/create' style={{textDecoration: 'none', color: '#636161'}}>Upload Song</NavLink></h3>
            <h3 style={{display:'inline', padding: 15}}><NavLink to={`/profile/${props.uid}`} style={{textDecoration: 'none', color: '#636161'}}>Profile</NavLink></h3>
            <h3 style={{display:'inline', padding: 15}}><NavLink to='/' onClick={props.signOut} style={{textDecoration: 'none', color: '#636161'}}>Log Out</NavLink></h3>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const uid = state.firebase.auth.uid
    return {
        uid: uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)