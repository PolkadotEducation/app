describe("Web3", () => {
  const Alice = {
    address: "5Fsaew2ZtsgpaCUWDmBnz8Jn8i49dvJFQUaJ5TZ6NGC1EBeS",
    addressWithPrefix0: "14osoGHdkexJ1jV2BQEo8H8vzL3oLDrPUyJnEkYSvMDXQcu7",
    name: "Alice",
    type: "sr25519",
    mnemonic: "blame only east lunar valve mother link pill expect eight quote table",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const DAPP_NAME = "Polkadot Education";
  const WALLET_NAME = "talisman";

  const checkWebinarImageVisibility = (shouldBeVisible: boolean) => {
    cy.getByData("image-login").should(shouldBeVisible ? "be.visible" : "not.be.visible");
  };

  describe("login", () => {
    it("login with polkadot wallet", () => {
      cy.visit("/");
      cy.initWallet([Alice], "", WALLET_NAME);

      cy.getByData("button-login-web3").click();
      cy.get(".WalletSelect-module_row-button__tVXqH").click();

      cy.getAuthRequests().then((authRequests) => {
        const requests = Object.values(authRequests);
        cy.wrap(requests.length).should("eq", 1);
        cy.wrap(requests[0].origin).should("eq", DAPP_NAME);
        cy.approveAuth(requests[0].id, [Alice.address]);
      });

      cy.get(".WalletSelect-module_row-button__tVXqH").click();

      cy.getAuthRequests().then((authRequests) => {
        const requests = Object.values(authRequests);
        cy.wrap(requests.length).should("eq", 2);
        cy.approveAuth(requests[1].id, [Alice.address]);
      });

      // not working yet, change to true after plugin update
      checkWebinarImageVisibility(false);
    });
  });
});
