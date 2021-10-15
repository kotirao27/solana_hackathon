[![Gitpod
Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/kotirao27/solana_hackathon/fraud-reveal-web)

# Fraud Reveal UI for Supliers and Financial Institutions

The project comprises of:

* A login screen to authenticate Invoice supplier and Bank or Financial Institution users.
* After successful login, supplier can view the invoices already created by him and can add/create a new invoice. 
* After successful login. bank or FI user can query a invoice using invoice/document number and suplier name.
* Bank or FI user will have to mark the queried invoice/document as financed or not financed.
* Bank or FI user will not have option to edit any other fields other that is financed status.
* A toast message wil be shown to the user after any successful/failed action.

## Table of Contents
- [Fraud Reveal UI interface Supliers and Financial Institutions](#fraud-reveal-ui-for-supliers-and-financial-institutions)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Install npm dependencies](#install-npm-dependencies)
    - [Build the project](#build-the-project)
    - [Launch project](#launch-project)
    - [Login to Fraud Reveal UI as Supplier](#login-to-fraud-reveal-ui-as-supplier)
    - [View aleady created invoices by Supplier](#view-already-created-invoices-by-supplier)
    - [Add a new invoice](#add-a-new-invoice)
    - [Login to Fraud Reveal UI as Bank user](#login-to-fraud-reveal-ui-as-bank-user)
    - [Query the invoices submitted by buyer to bank](#query-the-invoices-submitted-by-buyer-to-bank)
    - [Update invoice finance status](#update-invoice-finance-status)
    - [Wire frames link](#wire-frames-link)
    - [Solana program logs verification](#Solana-program-logs-verification)

## Quick Start

[![Open in
Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kotirao27/solana_hackathon/fraud-reveal-web)

If you decide to open in Gitpod then refer to
[README-gitpod.md](README-gitpod.md), otherwise continue reading.

The following dependencies are required to build and run this example, depending
on your OS, they may already be installed:

- Install node (v14 recommended)
- Install npm
If this is your first time using Rust, these [Installation
Notes](README-installation-notes.md) might be helpful.

### Install npm dependencies

```bash
npm install
```

### Build the project

```bash
npm run build
```
### Lauch project

```bash
npm run start
```

### Solana account and smart contract

A Solana account and program is already created and we will be using the existing account and program id

program id - 3FAUN1Q69vTXXU4z8qJKkaX8TFZUfo3ck6HuRsvFqsCA

This program is already deployed to https://api.devnet.solana.com

### Login to Fraud Reveal UI as Supplier

After successful launch, open chrome browser and open http://localhost:3000

To login as suppplier, login with username as Sony/Toshiba and password test.

### View aleady created invoices by Supplier

* Once supplier logged in, a supplier can view all the already created that were saved to Solana block chain for Invoice Fraud Reveal account.
* Basesd on the logged in supplier, invoices are filtered from the Solana block chain.
*  
### Add a new invoice

* Supplier will only be able to create/add a new invoice. A Add button is enabled for the logged in supplier.
* User can click on Add button, which will open a popup screen to add a new invoice.
* User can fill the required fileds so that a new invoice will be added to Solana block chain for Invoice Fraud Reveal account.
* A toast will appear on the screen after successful creation/addition of invoice.

### Login to Fraud Reveal UI as Bank user

After successful launch, open chrome browser and open http://localhost:3000

To login as FI/Bank user, login with username as fiuser or bankuser and password test.

### Query the invoices submitted by buyer to bank.

* Once a supplier raised an invoice against a buyer, buyer might approach a bank asking for finance.
* Bank users can validate the invoice submitted by the buyer using the Fraud Reveal portal.
* To validate the invoice and check if its already financed or not, user can input the document/invoice number, supplier name and search for the validity of the document.

### Update invoice finance status

* User also has option to update the finance status for the queried invoice.
* On the UI screen for a non financed document, update button is provided.
* User can click on the update button, reset the is financed status and save.
* Upon successful update, a toast message appears saying Update successful.

### Wire frames link
 https://invis.io/YSQ9LOMZW8V

### Solana program logs verification

* Any error while executing the program will be logged to the browser console.
* General Solana program transaction history can be viewed in https://explorer.solana.com/?cluster=devnet
* Search with program id (3FAUN1Q69vTXXU4z8qJKkaX8TFZUfo3ck6HuRsvFqsCA)
* Navigate to Transaction history and verify the latest.
