const chalk = require('chalk');
const ora = require('ora');
const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate');

class ArchwayCosmWasmClient {
  #client

  constructor(client) {
    this.#client = client;
  }

  get client() {
    return this.#client;
  }

  async getTx(txhash) {
    const { height, rawLog, gasWanted, gasUsed } = await this.client.getTx(txhash);
    const log = JSON.parse(rawLog);
    return {
      height,
      txhash,
      gasWanted,
      gasUsed,
      log,
    };
  }
}

async function connectClient({ chainId, node } = {}) {
  const client = CosmWasmClient.connect(node);
  ora.promise(client, chalk`Connecting to network {cyan ${chainId}}`);
  return new ArchwayCosmWasmClient(await client);
}

module.exports = {
  connectClient
}
