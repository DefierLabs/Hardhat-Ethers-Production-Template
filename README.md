# TEMPLATE

Template based on Aura finance' contracts open sourced repo production environment.

## Security

## Dev

### Install

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

Run fork tests

```sh
$ yarn test:fork:all
```

### Tasks

Running in fork mode

```sh
$ NODE_URL=<FORK_URL> yarn task:fork <TASK_NAME>
```

Running task normally

```
$ NODE_URL=<NODE_URL> yarn task --network <NETWORK> <TASK_NAME>
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

## Diagrams

## Deployments

### CHAIN (CHAIN ID)
