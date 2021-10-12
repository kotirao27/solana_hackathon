[![Gitpod
Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/kotirao27/solana_hackathon/fraud-reveal)

# Invoice Fraud Reveal on Solana

This project demonstrates how to use the [Solana Javascript
API](https://github.com/solana-labs/solana-web3.js) to
interact with programs on the Solana blockchain.

The project comprises of:

* An on-chain Invoice Fraud Reveal program useful for Trade Finance
* A client that can send a Create invoice request to an account.
* A client that can query the Invoice data for an account.
* A client that can update the Invoice Financed Status based on Invoice number and Supplier name

## Table of Contents
- [Invoice Fraud Reveal on Solana](#invoce-fraud-reveal-on-solana)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Configure CLI](#configure-cli)
    - [Start local Solana cluster](#start-local-solana-cluster)
    - [Install npm dependencies](#install-npm-dependencies)
    - [Build the on-chain program](#build-the-on-chain-program)
    - [Deploy the on-chain program](#deploy-the-on-chain-program)
    - [Run the JavaScript client](#run-the-javascript-client)
    - [Expected output](#expected-output)
      - [Not seeing the expected output?](#not-seeing-the-expected-output)
    - [Customizing the Program](#customizing-the-program)
  - [Learn about Solana](#learn-about-solana)
  - [Learn about the client](#learn-about-the-client)
    - [Entrypoint](#entrypoint)
    - [Establish a connection to the cluster](#establish-a-connection-to-the-cluster)
    - [Load the kycdocument on-chain program if not already loaded](#load-the-kycdocument-on-chain-program-if-not-already-loaded)
    - [Send an Create Invocie transaction to the on-chain program](#send-a-create-invoice-to-the-on-chain-program)
    - [Query the Solana account](#query-the-solana-account)
    - [Update the Solana account](#update-the-solana-account)
  
## Quick Start

[![Open in
Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kotirao27/solana_hackathon/fraud-reveal)

If you decide to open in Gitpod then refer to
[README-gitpod.md](README-gitpod.md), otherwise continue reading.

The following dependencies are required to build and run this example, depending
on your OS, they may already be installed:

- Install node (v14 recommended)
- Install npm
- Install the latest Rust stable from https://rustup.rs/
- Install Solana v1.7.11 or later from
  https://docs.solana.com/cli/install-solana-cli-tools

If this is your first time using Rust, these [Installation
Notes](README-installation-notes.md) might be helpful.

### Configure CLI

> If you're on Windows, it is recommended to use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run these commands

1. Set CLI config url to localhost cluster

```bash
solana config set --url localhost
```

2. Create CLI Keypair

If this is your first time using the Solana CLI, you will need to generate a new keypair:

```bash
solana-keygen new
```

### Start local Solana cluster

This example connects to a local Solana cluster by default.

Start a local Solana cluster:
```bash
solana-test-validator
```
> **Note**: You may need to do some [system tuning](https://docs.solana.com/running-validator/validator-start#system-tuning) (and restart your computer) to get the validator to run

Listen to transaction logs:
```bash
solana logs
```

### Install npm dependencies

```bash
npm install
```

### Build the on-chain program

This is Rust version of the on-chain program, whichever is built
last will be the one used when running the example.

```bash
npm run build:program-rust
```

### Deploy the on-chain program

```bash
solana program deploy dist/program/kycdocument.so
```

### Run the JavaScript client

```bash
npm run start
```

### Expected output

Public key values will differ:

```bash
Program H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt invoke [1]
Invoice Data storage called !!
Received request is {"invoiceno":"inv001","suppliername":"supp1","customername":"cust1","invoiceamt":10,"instruction":"CREATE","invoicedate":"10-OCT-2021","isfinanced":"N"}
Creation started
Received account data []
Updated data [InvoiceData { instruction: "CREATE", invoiceno: "inv001", suppliername: "supp1", customername: "cust1", invoicedate: "10-OCT-2021", invoiceamt: 10, isfinanced: "N" }]
End create.
Program H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt consumed 37618 of 200000 compute units
Program H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt success
```

#### Not seeing the expected output?

- Ensure you've [started the local cluster](#start-local-solana-cluster),
  [built the on-chain program](#build-the-on-chain-program) and [deployed the program to the cluster](#deploy-the-on-chain-program).
- Inspect the program logs by running `solana logs` to see why the program failed.
  - ```bash
    Transaction executed in slot 5621:
    Signature: 4pya5iyvNfAZj9sVWHzByrxdKB84uA5sCxLceBwr9UyuETX2QwnKg56MgBKWSM4breVRzHmpb1EZQXFPPmJnEtsJ
    Status: Error processing Instruction 0: Program failed to complete
    Log Messages:
      Program H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt invoke [1]
      Program log: Rust program entrypoint
      Program H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt consumed 200000 of 200000 compute units
      Program failed to complete: exceeded maximum number of instructions allowed (200000) at instruction #334
      Program H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt failed: Program failed to complete

### Customizing the Program

To customize the example, make changes to the files under `/src`.  If you change
any files under `/src/program-rust` you will need to
[rebuild the on-chain program](#build-the-on-chain-program) and [redeploy the program](#deploy-the-on-chain-program).

Now when you rerun `npm run start`, you should see the results of your changes.

## Learn about Solana

More information about how Solana works is available in the [Solana
documentation](https://docs.solana.com/) and all the source code is available on
[github](https://github.com/solana-labs/solana)

Further questions? Visit us on [Discord](https://discordapp.com/invite/pquxPsq)

## Learn about the client

The client in this example is written in TypeScript using:
- [Solana web3.js SDK](https://github.com/solana-labs/solana-web3.js)
- [Solana web3 API](https://solana-labs.github.io/solana-web3.js)

### Entrypoint

The [client's
entrypoint](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/main.ts#L13)
does five things.

### Establish a connection to the cluster

The client establishes a connection with the cluster by calling
[`establishConnection`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L110).

### Establish an account to pay for transactions

The client ensures there is an account available to pay for transactions,
and creates one if there is not, by calling
[`establishPayer`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L120).

### Check if the kycdocument on-chain program has been deployed

In [`checkProgram`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L158),
the client loads the keypair of the deployed program from `./dist/program/kycdocument-keypair.json` and uses
the public key for the keypair to fetch the program account. If the program doesn't exist, the client halts
with an error. If the program does exist, it will create a new account with the program assigned as its owner
to store program state.

### Send an Create Invocie transaction to the on-chain program

The client then constructs and sends a Invoice payload to the program by
calling
[`sendRequestData`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L223).
The transaction contains a single very simple instruction that primarily carries
the public key of the kycdocument program account to call and the 
account to which the client want to save invocie data.

### Query the Solana account

Each time the client says saves an invoice to an account, the program add a new invoice data entry to the account's data.  The client queries the
account data to filter the existing records by invoiceno and suppliername
[`queryData`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L230).

### Update the Solana account

Each time the client says saves an invoice to an account, the program add a new invoice data entry to the account's data.  The client can update th isfinanced flag for a particular record based on invoiceno and supplier.
[`updateData`](https://github.com/kotirao27/solana_hackathon/fraud-reveal/src/client/invoicekyc_client.ts#L237).


## Learn about the on-chain program

The [on-chain kycdocument program](/src/program-rust/Cargo.toml) is a Rust program
compiled to [Berkley Packet Format
(BPF)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) and stored as an
[Executable and Linkable Format (ELF) shared
object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format).

The program is written using:
- [Solana Rust SDK](https://github.com/solana-labs/solana/tree/master/sdk)

### Programming on Solana

To learn more about Solana programming model refer to the [Programming Model
Overview](https://docs.solana.com/developing/programming-model/overview).

To learn more about developing programs on Solana refer to the [On-Chain 
Programs Overview](https://docs.solana.com/developing/on-chain-programs/overview)

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
