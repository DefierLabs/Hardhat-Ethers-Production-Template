import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { Example__factory } from "../../types";
import { getSigner } from "../utils/signerFactory";

task("operation:example:start")
.addParam("contract", "address of contract to interact with")
.setAction(async (tskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const contractAddress = tskArgs.contract;
    const deployer = await getSigner(hre);
    await Example__factory.connect(contractAddress, deployer).start()
});
