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
    - [Build the on-chain program](#build-the-on-chain-program)
    - [Deploy the on-chain program](#deploy-the-on-chain-program)
    - [Run the JavaScript client](#run-the-javascript-client)
    - [Expected output](#expected-output)
    - [Customizing the Program](#customizing-the-program)
  - [Learn about Solana](#learn-about-solana)
  - [Learn about the client](#learn-about-the-client)
    - [Entrypoint](#entrypoint)
    - [Establish a connection to the cluster](#establish-a-connection-to-the-cluster)
    - [Load the kycdocument on-chain program if not already loaded](#load-the-kycdocument-on-chain-program-if-not-already-loaded)
    - [Send an Create Invocie transaction to the on-chain program](#send-a-create-invoice-to-the-on-chain-program)
    - [Update the Solana account](#update-the-solana-account)
  
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
### Login the Fraud Reveal UI as Supplier

After successful launch, open chrome browser and open http://localhost:3000

To login as suppplier, login with username as Sony/Toshiba and password test.

### View aleady created invoices as Supplier

Once supplier logged in, a supplier can view all the already uploaded invoices.

### Query the Solana account

Each time the client says saves an invoice to an account, the program add a new invoice data entry to the account's data.  The client queries the
account data to filter the existing records by invoiceno and suppliername
[`queryData`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L230).

### Update the Solana account

Each time the client says saves an invoice to an account, the program add a new invoice data entry to the account's data.  The client can update th isfinanced flag for a particular record based on invoiceno and supplier.
[`updateData`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L237).


## Pointing to a public Solana cluster

Solana maintains three public clusters:
- `devnet` - Development cluster with airdrops enabled
- `testnet` - Tour De Sol test cluster without airdrops enabled
- `mainnet-beta` -  Main cluster

Use the Solana CLI to configure which cluster to connect to.

To point to `devnet`:
```bash
solana config set --url devnet
```

To point back to the local cluster:
```bash
solana config set --url localhost
```
