import { Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import fetch from "node-fetch";
// import { ExtSystemConfig, Phase2Deployed } from "scripts/deploySystem";
import { Account } from "../types";

// impersonates a specific account
export const impersonate = async (addr: string, fund = true): Promise<Signer> => {
    // Dynamic import hardhat module to avoid importing while hardhat config is being defined.
    // The error this avoids is:
    // Error HH9: Error while loading Hardhat's configuration.
    // You probably tried to import the "hardhat" module from your config or a file imported from it.
    // This is not possible, as Hardhat can't be initialized while its config is being defined.
    const { network, ethers } = await import("hardhat");
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addr],
    });
    if (fund) {
        // Give the account 10 Ether
        await network.provider.request({
            method: "hardhat_setBalance",
            params: [addr, "0x8AC7230489E8000000"],
        });
    }
    return ethers.provider.getSigner(addr);
};

export const impersonateAccount = async (address: string, fund = true): Promise<Account> => {
    const signer = await impersonate(address, fund);
    return {
        signer,
        address,
    };
};

export async function forkWithTenderly(hre: HardhatRuntimeEnvironment, startBlock: number) {
    console.log("Forking with tenderly");
    const TENDERLY_ACCESS_KEY = process.env.TENDERLY_ACCESS_KEY;
    const TENDERLY_USER = process.env.TENDERLY_USER;
    const TENDERLY_PROJECT = process.env.TENDERLY_PROJECT;

    const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`;

    console.log("Fork: requesting API");
    const res = await fetch(TENDERLY_FORK_API, {
        method: "POST",
        body: JSON.stringify({
            network_id: "42161",
            block_number: startBlock,
        }),
        headers: {
            "X-Access-Key": TENDERLY_ACCESS_KEY,
            "Content-Type": "application/json",
        },
    });
    const json = await res.json();
    const forkId = json.simulation_fork.id;
    console.log(`Fork ID: ${forkId}`);
    const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
    const provider = new hre.ethers.providers.JsonRpcProvider(forkRPC);
    hre.ethers.provider = provider;
}
