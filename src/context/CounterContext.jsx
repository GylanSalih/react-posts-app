import React, { createContext, useContext, useReducer } from "react";

// Step 1: Define a context
export const CounterContext = createContext(null);

// Step 2: Define a reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

/* Step 3: Create a component that provides the
 context and manages state with useReducer
 */

export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // Log the state whenever it changes
  console.log("Counter state:", state);

  return (
    <CounterContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

// Step 4: Create a custom
// hook to access the context
export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(`useCounter must be used within a CounterProvider`);
  }
  return context;
}

export default CounterProvider;