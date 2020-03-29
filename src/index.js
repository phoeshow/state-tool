import React, { useContext, useReducer } from 'react';

export default class StateTools {
  static debug = false;

  static createStore(initState = {}, reducer = () => {}) {
    const StateCtx = React.createContext(initState);
    const DispatchCtx = React.createContext(reducer);

    const Provider = props => {
      const [state, dispatch] = useReducer(reducer, initState);
      return (
        <StateCtx.Provider value={state}>
          <DispatchCtx.Provider
            value={args => {
              if (this.debug) {
                console.log('action:', args);
                console.log('state: ', state);
              }
              dispatch(args);
            }}
          >
            {props.children}
          </DispatchCtx.Provider>
        </StateCtx.Provider>
      );
    };

    const useDispatch = () => {
      return useContext(DispatchCtx);
    };
    const useStore = () => useContext(StateCtx);

    return { Provider, useDispatch, useStore };
  }

  static combindProvider(...args) {
    return props =>
      args.reduce(
        (children, Parent) => <Parent>{children}</Parent>,
        props.children
      );
  }
}
