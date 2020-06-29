import PropTypes from 'prop-types';
import React from 'react';
import { Provider, useStore } from 'react-redux';

import { createPauseableStore, PauseableStoreInstance } from 'redux-pauseable-store';

import { PauseableContainerProps } from './types';

export interface PauseableReduxContainerProps extends PauseableContainerProps {
  children: React.ReactNode;
  dispatchWhenPaused?: boolean | null;
}

const PauseableReduxContainer: React.FC<PauseableReduxContainerProps> = (props) => {
  const { dispatchWhenPaused, shouldUpdate, children } = props;

  const parentStore = useStore();
  const pauseableStore = React.useMemo<PauseableStoreInstance>(
    () => createPauseableStore(parentStore),
    [parentStore],
  );

  pauseableStore.setPaused(!shouldUpdate);
  pauseableStore.setDispatch(dispatchWhenPaused);

  return <Provider store={pauseableStore}>{children}</Provider>;
};

PauseableReduxContainer.defaultProps = {
  dispatchWhenPaused: null,
};

PauseableReduxContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dispatchWhenPaused: PropTypes.bool,
  shouldUpdate: PropTypes.bool.isRequired,
};

export default PauseableReduxContainer;
