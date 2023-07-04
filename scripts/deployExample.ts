import { Signer } from "ethers";
import { Example__factory } from "../types/generated";
import { deployContract } from "../tasks/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

interface ExampleDeployed {
    example: Example;
}

async function deployExample(
    hre: HardhatRuntimeEnvironment,
    signer: Signer,
    debug = false,
    waitForBlocks = 0,
): Promise<ExampleDeployed> {
    const deployer = signer;

    const example = await deployContract<Example>(
        hre,
        new Example__factory(deployer),
        "Example",
        [], //arguments
        {},
        debug,
        waitForBlocks,
    );

    return { example };
}

export { deployExample, ExampleDeployed };
