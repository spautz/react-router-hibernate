import { Store } from 'redux';

export type PauseableStoreOptions = Partial<{
  /** Whether the pauseable store receives state updates from its parent store */
  isPaused: boolean;
  /** Whether the pauseable store can dispatch actions to its parent store */
  canDispatch: boolean | 'warn';
}>;

// @TODO: Apply template types from Redux:
// https://github.com/reduxjs/redux/blob/1766b93dae66bfbe3b87ff08b5a6788f640ca2d1/src/types/store.ts#L127

export interface PauseableStoreInstance extends Store {
  // All options are accessible via the store instance
  isPaused: PauseableStoreOptions['isPaused'];
  canDispatch: PauseableStoreOptions['canDispatch'];

  /** Enables or disables updates from the parent store */
  setPaused: (isPaused: boolean) => void;
  /** Enables or disables dispatching actions to the parent store */
  setDispatch: (canDispatch: boolean | 'warn') => void;

  /** For debugging only: don't touch this unless you know what you're doing */
  _parentStore: Store;
}
