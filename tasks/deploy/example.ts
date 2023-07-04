import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";

import { deployExample } from "../../scripts/deployExample";
import { getSigner } from "../utils/signerFactory";

task("deploy:example:example").setAction(async (tskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const deployer = await getSigner(hre);
    const result = await deployExample(hre, deployer);
    console.log("deployed to:", result.example.address);
});
