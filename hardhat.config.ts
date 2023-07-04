import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "solidity-docgen";
import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks/coverage";
import { chainIds } from "./tasks/utils/networkAddressFactory";
import "hardhat-tracer";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const compilerSettings = {
    metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
    },
    // Disable the optimizer when debugging
    // https://hardhat.org/hardhat-network/#solidity-optimizer-support
    optimizer: {
        enabled: true,
        runs: 800,
    },
};

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    gasReporter: {
        currency: "USD",
        enabled: process.env.DISABLE_GAS_REPORT ? false : true,
        excludeContracts: [],
        src: "./contracts",
    },
    networks: {
        hardhat: {
            chainId: chainIds.hardhat,
            allowUnlimitedContractSize: true,
        },
        mainnet: {
            chainId: chainIds.mainnet,
            url: process.env.ETHEREUM_NODE_URL || "",
        },
        gnosis: {
            chainId: chainIds.gnosis,
            url: process.env.GNOSIS_NODE_URL || "",
        },
        kovan: {
            url: process.env.KOVAN_NODE_URL || "",
            gasPrice: 3000000000,
        },
        goerli: {
            gasPrice: 3000000000,
            chainId: chainIds.goerli,
            url: process.env.GOERLI_NODE_URL || "",
        },
        arbitrum: {
            chainId: chainIds.arbitrum,
            url: process.env.ARBITRUM_NODE_URL || "",
        },
        optimism: {
            chainId: chainIds.optimism,
            url: process.env.OPTIMISM_NODE_URL || "",
        },
        polygon: {
            chainId: chainIds.polygon,
            gasPrice: 55000000000,
            url: process.env.POLYGON_NODE_URL || "",
        },
        arbitrumGoerli: {
            gasPrice: 3000000000,
            chainId: chainIds.arbitrumGoerli,
            url: process.env.ARBITRUM_GOERLI_NODE_URL || "",
        },
        forking: {
            url: process.env.NODE_URL || "",
        },
        rinkeby: {
            url: process.env.RINKEBY_NODE_URL || "",
            gasPrice: 3000000000,
        },
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        compilers: [
            {
                version: "0.6.12",
                settings: compilerSettings,
            },
            {
                version: "0.8.11",
                settings: compilerSettings,
            },
        ],
    },
    typechain: {
        outDir: "types/generated",
        target: "ethers-v5",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY,
    },
    mocha: {
        timeout: 480000, // 8 min timeout
    },
    docgen: {
        outputDir: "./docs/natspec",
        templates: "./docs/templates",
        exclude: ["_mocks", "test", "layerzero"],
    },
};

export default config;
