import React, {useContext} from "react";
import withRoot from "../withRoot";
import Context from "../context";

const App = () => {
  const {state: appState, dispatch: appDispatch} = useContext(Context);
  console.log({appState, appDispatch});
  
  return <div>App</div>;
};

export default withRoot(App);
