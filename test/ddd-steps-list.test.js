import { html, fixture, expect } from '@open-wc/testing';
import "../ddd-steps-list.js";

describe("DddStepsList test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ddd-steps-list
        title="title"
      ></ddd-steps-list>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
