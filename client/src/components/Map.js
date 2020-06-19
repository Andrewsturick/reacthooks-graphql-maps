import React, {useContext, useState, useEffect} from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL, {Marker, NavigationControl} from "react-map-gl";
import Context from "../context";
import PinIcon from "./PinIcon"
import MeIcon from "./MeIcon";
import Blog from "./Blog";
import { getGraphQLClient } from "../helpers";
import { PINS } from "../graphql/queries";
import {useClient} from "../hooks";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
const initialViewPort = {
  zoom: 13,
  longitude: 122.4376,
  latitude: -37.8
};

const Map = ({ classes, location, onClickMap}) => {
  const {state, dispatch} = useContext(Context);
  const [viewPort, setViewPort]  = useState(initialViewPort);
  const client = useClient(state.token)

  useEffect(() => {
    async function getPins() {
      console.log(client)     
      if (!client) return;
      const {pins} = await client.request(PINS);
      dispatch({type: "SET_PINS", pins})
    }
    getPins();
  }, [client]);

  useEffect(() => {
    setViewPort({...location, zoom: 13})
  }, [location && location.latitude])

  return (
    <div className={classes.root}>
      <ReactMapGL
        width="80vw"
        height="90vh"
        onViewportChange={viewport => setViewPort(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYXN0dXJpY2siLCJhIjoiY2tiaWE1Njc2MGQ2NDJybnpzNDU0d21rYSJ9.o2AAqaipeUA4q8sp9RlPcQ"
        {...viewPort}
        onClick={onClickMap}
        onDblClick={onClickMap}
      >
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={viewport => setViewPort(viewport)}
            />
        </div>
        {
          state.pins.map((pin, i) => {
            return (
              <Marker
                longitude={pin.longitude}
                latitude={pin.latitude}
                key={i}
                offsetTop={-13}
                offsetLeft={-13}
              >
                <PinIcon color="red" size="30"/>
              </Marker>)
          })
        }
      {
        state.location && 
        <Marker
          longitude={state.location.longitude}
          latitude={state.location.latitude}
          offsetTop={-13}
          offsetLeft={-13}
        >
          <MeIcon />
        </Marker>
      }
      {
        state.draftPin &&
        <>
          <Marker
            longitude={state.draftPin.longitude}
            latitude={state.draftPin.latitude}
            offsetTop={-13}
            offsetLeft={-13}
          >
              <PinIcon color="green" size="30"/>
              
          </Marker>
        </>
      }
      </ReactMapGL>
      <Blog draftPin={state.draftPin} />

    </div>
  )
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
