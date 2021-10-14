import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./App.css";
import LoginForm from './components/LoginForm';
import DashBoard from "./components/DashBoard";
import Sender from "./components/Sender";
import Query from "./components/Query";


import { initSolanaWallet, WalletAdapter } from "./helpers/wallet";

interface IState {
  isSmallScreen: boolean;
}
  class App extends React.Component<{}, IState> {
  constructor(props : any){
    super(props);

    initSolanaWallet();
}
  
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={LoginForm}/>
            <Route path="/viewdocuments" component={DashBoard}/>
            <Route path="/fipage" component={Query}/>
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
