// Combined file for ddd-steps-list and ddd-steps-list-item
// Author: nickcos912 | License: Apache-2.0
import { LitElement, html, css } from "lit";

// ddd-steps-list-item definition
class DddStepsListItem extends LitElement {
  static get properties() {
    return {
      step: { type: Number, reflect: true }
    };
  }

  constructor() {
    super();
    this.step = 0;
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
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1rem;
        margin-right: var(--ddd-spacing-4, 16px);
        background-color: #ddd;
        color: #000;
      }

      :host([data-primary]) .step-circle {
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: #fff;
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
        if (this.dddPrimary) {
          child.setAttribute('data-primary', '');
        } else {
          child.removeAttribute('data-primary');
        }
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has('dddPrimary')) {
      const items = this.querySelectorAll('ddd-steps-list-item');
      items.forEach(item => {
        if (this.dddPrimary) {
          item.dddPrimary = this.dddPrimary;
        } else {
          item.removeAttribute('data-primary');
        }
      });
    }
  }
}
customElements.define('ddd-steps-list', DddStepsList);