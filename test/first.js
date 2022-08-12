const { expect } = require('chai');
const { ethers } = require('ethers');
const truffleAssert = require('truffle-assertions');

const Dai = artifacts.require('Dai');
const PaymentProcessor = artifacts.require('PaymentProcessor');

contract('ecommerce', function (accounts) {
  let dai;
  let paymentProcessor;

  const adminAccount = accounts[0];
  const payerAccount = accounts[1];

  console.log(adminAccount, payerAccount);

  beforeEach(async () => {
    dai = await Dai.deployed();
    paymentProcessor = await PaymentProcessor.new([adminAccount, dai.address], {
      from: adminAccount,
    });
  });
  //   afterEach(() => {

  //   })
  it('should emit on transfer', async function () {
    const paymentId = 'random';

    let tx = await paymentProcessor.pay(200, paymentId);

    truffleAssert.eventEmitted(tx, 'PaymentDone');
  });
});
