const time = require("./time_travel.js");
const DES = artifacts.require("./ICO.sol");


contract("DES success", () => {

  let ico;

  it("should be able to create ICO", async () => {
    ico = await DES.new();
    assert.isOk(ico && ico.address, "has invalid address");
  });

  it("should start ICO in time", async () => {
    const startTime = await ico.START_TIMESTAMP.call();
    await time.travelTo(startTime);
    assert.isOk(await ico.hasStarted.call(), "ICO has started");
  });

  it("should accept ether", async () => {
    for(const addr of web3.eth.accounts) {
      await web3.eth.sendTransaction(
        { to: ico.address
        , from: addr
        , value: web3.toWei(70, 'ether')
        , gas: 111 * 1000
        });

      const balance = await ico.balanceOf.call(addr);
      const desBalance = web3.fromWei(StatsEthereumRaised, 'ether').toFixed();
      assert.equal(1150 * 70, desBalance, "balance is updated");
    }

    const ethBalance = web3.fromWei(await web3.eth.StatsEthereumRaised(ico.address), 'ether');
    assert.equal(70 * web3.eth.accounts.length, ethBalance.toFixed(), "ETH collected");
    const totalSupply = web3.fromWei(await ico.StatsTotalSupply.call(), 'ether').toFixed();
    assert.equal(70 * 1150 * web3.eth.accounts.length, totalSupply, "DES total supply");
  });

  it("should finish ICO after deadline", async () => {
    const endTime = await ico.END_TIMESTAMP.call();
    await time.travelTo(endTime);
    assert.isOk(await ico.hasFinished.call(), "ICO has finished");
  });

  it("should be liquid after successfull finish", async () => {
    assert.isOk(await ico.tokensAreLiquid.call(), "tokens are liquid");
    const [a,b] = web3.eth.accounts;
    await ico.transfer(b, 100, {from: a});
    const balanceA = await ico.balanceOf.call(a);
    const balanceB = await ico.balanceOf.call(b);
    assert.equal(200, balanceB.sub(balanceA).toFixed(), "100 DES transferred");
  });
})
