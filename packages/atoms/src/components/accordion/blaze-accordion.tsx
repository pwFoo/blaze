import {Component, Element, Event, EventEmitter, Listen} from '@stencil/core';

@Component({
  tag: 'blaze-accordion'
})
export class Accordion {

  @Element() private element: HTMLElement;
  @Event() onToggle: EventEmitter;

  @Listen('onTogglePane')
  onTogglePane(ev) {
    const accordion = this.element.children[0];
    const open = ev.detail;
    const pane = ev.target;
    const idx = [].indexOf.call(accordion.children, pane);
    this.onToggle.emit({ idx, pane, open });
  }

  render() {
    return (
      <div class="c-card c-card--accordion">
        <slot />
      </div>
    );
  }
}
