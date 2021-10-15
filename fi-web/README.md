[![Gitpod
Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/kotirao27/solana_hackathon/fi-web)

# Bank Portal For Financing documents

The project comprises of:

* A sample representation of how a bank user while financing an invoice can get to know if the invoice is already financed by some other bank/FI.
* A Login screen for a bank user.
* UI to query invoices using document number and supplier name.
* While financing a document, request flows to Solana and fetch account info to validate if the invoice is already financed.
* An invoice that is already financed cannot be financed.

## Table of Contents
- [Bank Portal For Financing documents](#bank-portal-for-financing-documents)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Install npm dependencies](#install-npm-dependencies)
    - [Build the project](#build-the-project)
    - [Launch project](#launch-project)
    - [Login to bank portal](#login-to-bank-portal)
    - [Query the invoices submitted by buyer to bank](#query-the-invoices-submitted-by-buyer-to-bank)
    - [Provide finance for invoice](#provide-finance-for-invoice)
    - [Know if the document is already financed](#know-if-the-document-is-already-financed)
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

To login as bank user, login with username as testbank1/testbank2 and password test.

### Query the invoices submitted by buyer to bank.

* Once a supplier raised an invoice against a buyer, buyer might approach a bank asking for finance.
* Bank user can query for the invoices in the Bank UI portal and provide finance.
* User input the invoice using document number, supplier name and click on search.
* If the queried invoice is valid and uploaded to Solana by the supplier already, we will be receving the matched records.
* If there are no records available, we will receive a toast message showing No records found.

### Provide finance for invoice
* After successful retrieval of queried invoice, Bank user will have Finace button enabled.
* User can click on Finance button to provide finance.
* Upon successful financing, Is Financed status will be updated to Financed status in Solana block chain.

### Alert if the document is already financed
* Whenever user wants to provide finance to an invoice.
* Bank user will have Finance button to provide finance.
* If the invoice bank user trying to finance is already financed by other institutions, an alert will be shown on the screen that document already financed !!.

### Solana program logs verification

* Any error while executing the program will be logged to the browser console.
* General Solana program transaction history can be viewed in https://explorer.solana.com/?cluster=devnet
* Search with program id (3FAUN1Q69vTXXU4z8qJKkaX8TFZUfo3ck6HuRsvFqsCA)
* Navigate to Transaction history and verify the latest.
