// Combined file for ddd-steps-list and ddd-steps-list-item
// Author: nickcos912 | License: Apache-2.0
import { LitElement, html, css } from "lit";

// ddd-steps-list-item definition
class DddStepsListItem extends LitElement {
  static get properties() {
    return {
      step: { type: Number, reflect: true },
      dddPrimary: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.step = 0;
    this.dddPrimary = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: var(--ddd-spacing-6, 24px);
      }

      :host(:last-child) {
        margin-bottom: 0;
      }

      .step-wrapper {
        display: flex;
        align-items: flex-start;
      }

      .step-circle {
        width: var(--ddd-spacing-8, 32px);
        height: var(--ddd-spacing-8, 32px);
        border-radius: var(--ddd-radius-full, 9999px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--ddd-font-weight-bold, bold);
        font-size: var(--ddd-font-size-md, 1rem);
        margin-right: var(--ddd-spacing-4, 16px);
        background-color: var(--ddd-color-secondary, #ddd);
        color: var(--ddd-color-text, #000);
      }

      :host([ddd-primary]) .step-circle {
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: var(--ddd-theme-default-white, #fff);
      }

      .step-content {
        flex: 1;
      }

      @media (max-width: 768px) {
        .step-wrapper {
          flex-direction: column;
          align-items: flex-start;
        }

        .step-circle {
          margin-bottom: var(--ddd-spacing-2, 8px);
        }
      }
    `;
  }

  render() {
    return html`
      <div class="step-wrapper">
        <div class="step-circle">${this.step}</div>
        <div class="step-content"><slot></slot></div>
      </div>
    `;
  }
}
customElements.define('ddd-steps-list-item', DddStepsListItem);

// ddd-steps-list definition
class DddStepsList extends LitElement {
  static get properties() {
    return {
      dddPrimary: { type: Boolean, attribute: 'ddd-primary', reflect: true }
    };
  }

  constructor() {
    super();
    this.dddPrimary = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--ddd-spacing-4, 16px);
        box-sizing: border-box;
      }
    `;
  }

  render() {
    return html`<slot @slotchange="${this._onSlotChange}"></slot>`;
  }

  firstUpdated() {
    this._validateChildren();
  }

  _onSlotChange() {
    this._validateChildren();
  }

  _validateChildren() {
    const children = Array.from(this.children);
    let stepCount = 0;
    children.forEach(child => {
      const tag = child.tagName.toLowerCase();
      if (tag !== 'ddd-steps-list-item') {
        this.removeChild(child);
      } else {
        stepCount++;
        child.step = stepCount;
        child.dddPrimary = this.dddPrimary;
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has('dddPrimary')) {
      const items = this.querySelectorAll('ddd-steps-list-item');
      items.forEach(item => {
        item.dddPrimary = this.dddPrimary;
      });
    }
  }
}
customElements.define('ddd-steps-list', DddStepsList);
