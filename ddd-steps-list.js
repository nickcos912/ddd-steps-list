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
        margin-bottom: var(--ddd-spacing-6);
      }

      :host(:last-child) {
        margin-bottom: 0;
      }

      .step-wrapper {
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        gap: var(--ddd-spacing-4);
      }

      .step-circle {
        width: var(--ddd-spacing-8);
        height: var(--ddd-spacing-8);
        border-radius: var(--ddd-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-md);
        background-color: var(--ddd-color-secondary);
        color: var(--ddd-color-text);
        flex-shrink: 0;
      }

      :host([data-primary]) .step-circle {
        background-color: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-white);
      }

      .step-content {
        flex: 1;
        min-width: 0;
      }

      @media (max-width: 600px) {
        .step-wrapper {
          flex-direction: column;
          align-items: flex-start;
        }

        .step-circle {
          margin-bottom: var(--ddd-spacing-2);
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
        padding: var(--ddd-spacing-4);
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
      if (child.tagName.toLowerCase() === 'ddd-steps-list-item') {
        stepCount++;
        child.step = stepCount;
        if (this.dddPrimary) {
          child.setAttribute('data-primary', '');
        } else {
          child.removeAttribute('data-primary');
        }
      } else {
        this.removeChild(child);
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