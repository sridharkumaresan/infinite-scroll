import { trigger, state, style, transition, animate } from "@angular/animations";
export enum VisibilityState {
    Visible = 'visible',
    Hidden = 'hidden'
};

export const slideDown = [trigger('toggle', [
    state(
      VisibilityState.Visible,
      style({ opacity: 0, transform: 'translateY(-100%)' })
    ),
    state(
      VisibilityState.Hidden,
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
    transition('* => *', animate('200ms ease-in'))
  ])]

 