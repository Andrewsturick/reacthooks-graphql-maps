import React, {useContext, useEffect} from "react";
import withRoot from "../withRoot";
import Context from "../context";
import {GraphQLClient} from "graphql-request";
import Header from "../components/Header";
import {MY_LOCATION_QUERY} from "../graphql/queries";
import Map from "../components/Map";

function getGraphQLClient(state) {
  return new GraphQLClient("http://as.be.ngrok.io/graphql", {
    headers: {
      authorization: state.currentUser.token
    }
  })
}

const App = () => {
  const {state, dispatch} = useContext(Context);
  
  useEffect(() => {
    async function fetchData() {
      dispatch({type: "IS_LOADING_MAP_DATA", isLoadingMapData: true})
      
      const client = getGraphQLClient(state)
      const {myLocation: location} = await client.request(MY_LOCATION_QUERY);

      dispatch({type: "SET_CURRENT_LOCATION", location});
      return;
    }
    fetchData();
  }, [state.currentUser._id]);

  const onClickMap = (e) => {
    console.log(e.target.className == "overlays")
    if (e.leftButton && !state.draftPin && e.target.className === "overlays") {
      return dispatch({type: "ADD_DRAFT_PIN", pin: {latitude: e.lngLat[1], longitude: e.lngLat[0]}});
    }
  } 

  return (
    <div>
      <Header />
      {
        !state.isLoadingMapData && state.location ?
          (<Map onClickMap={onClickMap} location={state.location}/>) :
          (<div>loading</div>)
      }
      
    </div>
  );
};

export default withRoot(App);
