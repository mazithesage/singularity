import { ethers } from "hardhat";
import { expect } from "chai";

describe("TradeExecutor", function () {
  let owner: any;
  let executor: any;
  let stranger: any;
  let token: any;
  let tradeExecutor: any;

  beforeEach(async function () {
    [owner, executor, stranger] = await ethers.getSigners();

    // Deploy mock ERC20
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    token = await ERC20Mock.deploy("MockToken", "MTK", owner.address, ethers.parseEther("1000"));

    // Deploy TradeExecutor
    const TradeExecutor = await ethers.getContractFactory("TradeExecutor");
    tradeExecutor = await TradeExecutor.deploy();
    await tradeExecutor.waitForDeployment();

    // Set executor
    await tradeExecutor.connect(owner).setExecutor(executor.address, true);
  });

  it("should add and remove executor correctly", async () => {
    expect(await tradeExecutor.executors(executor.address)).to.equal(true);
    await tradeExecutor.connect(owner).setExecutor(executor.address, false);
    expect(await tradeExecutor.executors(executor.address)).to.equal(false);
  });

  it("should execute trade successfully by authorized executor", async () => {
    await token.connect(owner).approve(tradeExecutor, ethers.parseEther("10"));
    await token.connect(owner).transfer(executor.address, ethers.parseEther("10"));
    await token.connect(executor).approve(tradeExecutor, ethers.parseEther("10"));

    const tx = await tradeExecutor
      .connect(executor)
      .executeTrade(
        await token.getAddress(),
        await token.getAddress(),
        owner.address,
        ethers.parseEther("1"),
        ethers.toUtf8Bytes("test trade")
      );

    await expect(tx).to.emit(tradeExecutor, "TradeExecuted");
  });

  it("should revert if non-executor tries to execute trade", async () => {
    await expect(
      tradeExecutor
        .connect(stranger)
        .executeTrade(
          await token.getAddress(),
          await token.getAddress(),
          owner.address,
          ethers.parseEther("1"),
          ethers.toUtf8Bytes("test")
        )
    ).to.be.revertedWith("Not authorized executor");
  });

  it("should pause and unpause correctly", async () => {
    await tradeExecutor.connect(owner).pause();
    await expect(
      tradeExecutor
        .connect(executor)
        .executeTrade(
          await token.getAddress(),
          await token.getAddress(),
          owner.address,
          ethers.parseEther("1"),
          ethers.toUtf8Bytes("test")
        )
    ).to.be.revertedWith("Contract paused");
    await tradeExecutor.connect(owner).unpause();
  });
});
