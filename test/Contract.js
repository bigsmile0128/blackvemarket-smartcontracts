const Contract = artifacts.require("Contract");

contract("Contract", (accounts) => {
  const [firstAccount] = accounts;

  it("has a contract length <24kb", async () => {
    const contractInstance = await Contract.new();
    expect(
      contractInstance.constructor._json.deployedBytecode.length
    ).to.be.lessThan(24000);
  });

  it("sets the creator as owner", async () => {
    const contractInstance = await Contract.new();
    const owner = await contractInstance.owner.call();
    expect(owner).to.equal(firstAccount);
  });
});
