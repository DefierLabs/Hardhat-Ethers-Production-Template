import hre, { ethers, network } from "hardhat";
import { Signer } from "ethers";
import { deployExample, ExampleDeployed } from "../scripts/deployExample";

describe("Example", () => {
    let deployer: Signer;
    let example: ExampleDeployed;

    before(async () => {
        await network.provider.request({
            method: "hardhat_reset",
            params: [
                {
                    forking: {
                        jsonRpcUrl: process.env.NODE_URL,
                    },
                },
            ],
        });

        const accounts = await ethers.getSigners();
        deployer = accounts[1];
    });

    describe("Example", () => {
        it("deploy contract", async () => {
            example = await deployExample(hre, deployer);
        });
        it("can trigger contract function", async () => {
            await example.example.start();
        });
    });
});
