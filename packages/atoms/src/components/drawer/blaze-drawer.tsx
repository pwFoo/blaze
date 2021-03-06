import { Component, Event, EventEmitter, Prop, Method, State, Element } from '@stencil/core';

@Component({
  tag: 'blaze-drawer'
})
export class Drawer {

  @Element() elem: HTMLElement;
  @Prop() open: boolean = false;
  @Prop() dismissible: boolean = false;
  @Prop() position: string = 'bottom';
  @State() _isOpen: boolean = false;
  @Event() onClose: EventEmitter;

  @Method()
  close() {
    this._isOpen = false;
    this.onClose.emit();
  }

  @Method()
  show() {
    this._isOpen = true;
  }

  @Method()
  isOpen() {
    return this._isOpen;
  }

  componentWillLoad() {
    this._isOpen = this.open;
  }

  dismiss() {
    if (this.dismissible) this.close();
  }

  render() {
    const drawerIsOpenClass = this._isOpen ? 'o-drawer--visible' : '';
    const overlayIsOpenClass = this._isOpen ? 'c-overlay--visible' : '';

    return (
      [
        <div aria-hidden onClick={() => this.dismiss()} class={`c-overlay c-overlay--fullpage ${overlayIsOpenClass}`} />,
        <aside aria-expanded={this.isOpen.toString()} class={`o-drawer o-drawer--${this.position} ${drawerIsOpenClass}`}>
          <slot />
        </aside>
      ]
    );
  }
}
