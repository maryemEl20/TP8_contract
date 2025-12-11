module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "5777",   
      gas: 6721975          
    }
  },
  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.17",     
      settings: {
        optimizer: {
          enabled: true,     
          runs: 200
        }
      }
    }
  },
  db: {
    enabled: false
  }
};
