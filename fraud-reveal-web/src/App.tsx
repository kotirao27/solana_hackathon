import { Connection } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import "./App.css";
import Sender from "./components/Sender";
import TransactionsView from "./components/TransactionView";
import {
  getTransactions,
  TransactionWithSignature,
} from "./helpers/transactions";
import { initSolanaWallet, WalletAdapter } from "./helpers/wallet";

function App() {
  const [transactions, setTransactions] =
    useState<Array<TransactionWithSignature>>();
  const conn = React.useRef<Connection>();
  const wall = React.useRef<WalletAdapter>();

  useEffect(() => {
    initSolanaWallet();
  }, []);

  const didSaveInvoice = () => {
   // getTransactions(conn.current!, wall.current!.publicKey!).then((trans) => {
    //  setTransactions(trans);
   // });
  };

  return (
    <div className="app-body">
      <div className="app-body-top">
        <h3>Upload Invoice</h3>
        <Sender didSaveInvoice={didSaveInvoice} />
      </div>
    </div>
  );
}

export default App;
