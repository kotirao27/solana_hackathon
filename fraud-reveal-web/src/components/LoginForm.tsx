import React, { useState } from "react";
import "./LoginForm.css";
import Link,{ useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import {setUser} from '../helpers/utils';


interface RouterProps {
  history: any;
  location: any;
  match: any;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    username: string,
    password: string,
    showmessage:boolean
};

export default class LoginForm extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.setUserName = this.setUserName.bind(this); 
        this.setPassword = this.setPassword.bind(this); 

        this.state = {
          username: "",
          password: "",
          showmessage:false
        };
      }

      componentDidMount(){
        this.setState({showmessage: false});
      }

      setUserName(e: any) {
        this.setState({username: e.target.value});
      }

      setPassword(e: any){
        this.setState({password: e.target.value});
      }

      handleLogin(){
        window.sessionStorage.setItem("user", this.state.username);
        if(this.state.username =="One Plus" || this.state.username =="Sony"|| this.state.username =="Toshiba") {
            this.props.history.push("/viewdocuments");
        } else if(this.state.username =="fiuser"){
          this.props.history.push("/fipage");
        }
        else if(this.state.username =="bankuser"){
          this.props.history.push("/fipage");
        }
        else {
          this.setState({showmessage: true});
            this.props.history.push("/")  ;
        }
      }

    render() {
  return (

<div className="login-container clearfix">

	<section className="login-left-panel">
	</section>
	<section className="login-right-panel">		
		<div className="login-content-block">			
			<div className="login-title-section">				
				<h2 className="title-2">Fraud Reveal</h2>
			</div>
			<div className="login-form-section">
				<form method="post" action="" autoComplete="off" >
					<input type="text" id="username" name="username" value={ this.state.username } className="login-form-field" onChange={this.setUserName} placeholder="Username" autoFocus />
					<input type="password" id="password" name="password" className="login-form-field" onChange={this.setPassword} placeholder="Password" />		
					<button type="button" id="submitbut" name="submitbut" className="login-button" value="Sign In"  onClick={this.handleLogin}> Login</button>
				  {this.state.showmessage ? (<span className="error-msg">Username or Password is incorrect</span>) :null}
        </form>
			</div>
		</div>			
	</section>
</div>
    );
  }
};
