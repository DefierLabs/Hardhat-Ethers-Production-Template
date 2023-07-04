module.exports = {
    istanbulReporter: ["html", "lcov"],
    providerOptions: {
        mnemonic: process.env.MNEMONIC,
    },
    skipFiles: ["_mocks", "test", "interfaces"],
    configureYulOptimizer: true,
};
