const {expect}=require("chai");
const { ethers } = require("hardhat");

describe("test",function(){
  let token;
  let accounts;
  const amount=ethers.utils.parseEther("1");
  before(async()=>{
    const contract=await ethers.getContractFactory("GLDToken");
    token =await (await contract).deploy();
    accounts=await ethers.getSigners();
    await token.deployed();

  });
  it("balance",async()=>{
    const total=await token.totalSupply();
    expect(await token.balanceOf(accounts[0].address)).to.equal(total);
  })
  it("test 1",async()=>{
    const wallet=token.connect(accounts[2]);
    await expect(wallet.mint(accounts[2].address,amount)).to.be.reverted;
  })
  it("test 2",async()=>{
    const wallet=token.connect(accounts[2]);
    await expect(wallet.burn(accounts[2].address,amount)).to.be.reverted;
  })
  it("test 3",async()=>{
    const wallet=token.connect(accounts[2]);
    const option={value:amount};
    const calc=(option.value).mul(1000);
    await wallet.buy(option);
    expect(await wallet.balanceOf(accounts[2].address)).to.equal(calc)
    let bal=await token.balanceOf(accounts[2].address);
    


  })
  it("test 4",async()=>{
    const wallet=token.connect(accounts[2]);
    await expect(wallet.width(amount)).to.be.reverted;
  })
  it("test 5",async ()=>{
    await token.transfer(accounts[1].address,amount);
    expect(await token.balanceOf(accounts[1].address)).to.be.greaterThanOrEqual(amount)
  })
  it("test 6",async ()=>{
    const wallet=token.connect(accounts[3]);
    await expect(wallet.transfer(accounts[1].address,1)).to.be.reverted;

    
  })
  it("test 7",async ()=>{
    const before_mint=await token.balanceOf(accounts[0].address);
    await token.mint(accounts[0].address,amount);
    const after_mint=await token.balanceOf(accounts[0].address);
    expect(after_mint).to.equal((before_mint.add(amount)));
   
  })
  it("test 8",async ()=>{
    const before_mint=await token.balanceOf(accounts[0].address);
    await token.burn(accounts[0].address,amount);
    const after_mint=await token.balanceOf(accounts[0].address);
    expect(after_mint).to.equal((before_mint.sub(amount)));

  })
  it("test 9",async()=>{
    const befbal=await accounts[0].getBalance();
    await token.width(amount);
    const aftebal=await accounts[0].getBalance();
    expect(befbal.lt(aftebal)).to.equal(true);
  })
  it("test 10",async()=>{
    const wallet=token.connect(accounts[3]);
    const big=ethers.utils.parseEther("99999");
    const option={value:big};
    let error;
    try{
      await wallet.buy(option);
    }catch(err){
      error="hello";
     
    }
    expect(error).to.equal("hello");


  })
  


})
