import { NgRedux } from '@angular-redux/store';
import { Action } from 'redux';

import { IAppState } from '../../store';

export abstract class BaseDispatcher {

  constructor(protected ngRedux: NgRedux<IAppState>) {}

  dispatch<A extends Action>(actionToDispatch: A): void {
    this.ngRedux.dispatch(actionToDispatch);
  }
}
