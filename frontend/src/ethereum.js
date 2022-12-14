import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json';

const { ethers, Contract } = window.ethers;

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      console.log('ethe', window.ethereum);
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        console.log(
          PaymentProcessor.networks[window.ethereum.networkVersion].address
        );
        const paymentProcessor = new Contract(
          PaymentProcessor.networks[window.ethereum.networkVersion].address,
          PaymentProcessor.abi,
          signer
        );

        const dai = new Contract(
          Dai.networks[window.ethereum.networkVersion].address,
          Dai.abi,
          signer
        );
        resolve({ provider, paymentProcessor, dai });
      }
      resolve({
        provider: undefined,
        paymentProcessor: undefined,
        dai: undefined,
      });
    });
  });

export default getBlockchain;
