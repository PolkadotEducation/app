import { KeypairType } from "@polkadot/util-crypto/types";
import { checkLoginSuccess } from "../support/utils";

describe("Web3", () => {
  const Alice = {
    address: "5Fsaew2ZtsgpaCUWDmBnz8Jn8i49dvJFQUaJ5TZ6NGC1EBeS",
    addressWithPrefix0: "14osoGHdkexJ1jV2BQEo8H8vzL3oLDrPUyJnEkYSvMDXQcu7",
    name: "Alice",
    type: "sr25519" as KeypairType,
    mnemonic: "blame only east lunar valve mother link pill expect eight quote table",
  };

  const DAPP_NAME = "Polkadot Education";
  const WALLET_NAME = "Talisman";

  const initWalletAuthorized = () => cy.initWallet([Alice], DAPP_NAME, WALLET_NAME.toLowerCase());
  const initWalletUnauthorized = () => cy.initWallet([Alice], "", WALLET_NAME.toLowerCase());

  const selectWallet = () => cy.get("[class^='_row-button'] > span").contains(WALLET_NAME);
  const selectAccount = () => cy.get("[class^='_row-button'] > span > :nth-child(1)");

  describe("login", () => {
    it("authorize the dapp", () => {
      cy.visit("/");
      initWalletUnauthorized();

      cy.getByData("button-login-web3").click();
      selectWallet().click();

      cy.getAuthRequests().then((authRequests) => {
        const requests = Object.values(authRequests);
        cy.wrap(requests.length).should("eq", 1);
        cy.wrap(requests[0].origin).should("eq", DAPP_NAME);
        cy.approveAuth(requests[0].id, [Alice.address]);
      });

      selectAccount().should("be.visible").and("contain", "Alice");
    });

    it("login with polkadot wallet", () => {
      cy.visit("/");
      initWalletAuthorized();

      cy.getByData("button-login-web3").click();
      selectWallet().click();
      selectAccount().click();

      cy.getTxRequests().then((txRequests) => {
        const requests = Object.values(txRequests);
        cy.wrap(requests.length).should("eq", 1);
        cy.wrap(requests[0].payload.address).should("eq", Alice.address);
        cy.approveTx(requests[0].id);
      });

      checkLoginSuccess();
    });
  });
});
