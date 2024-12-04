import { LitElement, html, css } from 'lit';
import {customElement, property} from 'lit/decorators.js';

export class Box extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    div {
      padding: var(--box-padding, 1rem);
      background-color: var(--box-bg-color, #f9f9f9);
      border: var(--box-border, 1px solid #ccc);
      border-radius: var(--box-border-radius, 4px);
    }
  `;

  @property({ type: String }) padding: string = '1rem';
  @property({ type: String }) bgColor: string = '#f9f9f9';

  render() {
    return html`
      <div style="padding: ${this.padding}; background-color: ${this.bgColor};">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-box', Box);
