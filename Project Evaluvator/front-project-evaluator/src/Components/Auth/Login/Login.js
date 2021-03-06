import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios';
import swal from 'sweetalert';
import './Login.css';
import history from '../../../history'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loginStudent} from '../../../actions/authActions'
import NavBar from '../Navbar'
class Login extends Component{
  constructor(props){
    super(props);
    this.state ={
      UserName :'',
      password : ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextprops){
    if(nextprops.auth.isAuthenticated){
      this.props.history.push('/project')
    }
  }


  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

   postLogin=()=>{
  //   axios.post('http://localhost:4000/api/authenticate',this.state)
  //   .then(res=>{
  //     this.props.history.push('/student')

  //   })
  //   .catch(err=>{
  //     swal ( "Oops" ,  err.response.data.message ,  "error" )
      
  //   })

    this.props.loginStudent(this.state)

   }


  render(){
    const {errors} =this.state
    return (
      <div>
        <NavBar/>
      <MDBContainer className="login">
        <MDBRow>
          
          <MDBCol sm="6">
            <MDBCard className="w-75 p-3">
              <MDBCardBody >
                <form>
                <div className="header pt-3 grey lighten-2">
                <p className="h4 text-center py-4">Login</p>
                </div>
                  <MDBInput 
                  required
                    label="User Name"  
                    className="w-75 p-3"
                    name="UserName"
                    onChange={this.handleChange}
                    value={this.state.UserName}

                    group 
                    type="text"
                    validate
                    error="wrong"
                    success="right" />
                  <MDBInput
                    label="Your password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    group
                    type="password"
                    className="w-75 p-3"
                    validate
                    error="wrong"
                    success="right"
                    containerClass="mb-0"
                    required
                  />
                  <p className="font-small grey-text d-flex justify-content-end">
                    Forgot
                    <a
                      href="#!"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Password?
                    </a>
                  </p>
                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      color="indigo"
                      onClick ={this.postLogin}
                    >
                      Log in
                    </MDBBtn>
                  </div>
                </form>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                 
                 
          <Link to="/register">Sign up</Link>
              
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="6"></MDBCol>
        </MDBRow>
      </MDBContainer>



    </div>
    )
  }
}
Login.prototypes={
  loginStudent:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapstatetoprops =(state)=>({
auth :state.auth,
errors :state.errors
})

export default connect(mapstatetoprops,{loginStudent})(Login);