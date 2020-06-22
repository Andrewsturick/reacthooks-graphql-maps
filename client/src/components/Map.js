import React, {useContext, useState, useEffect} from "react";
import ReactMapGL, {Map as ReactMap, Marker, NavigationControl, Popup} from "react-map-gl";
import { useSubscription } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import { withStyles } from "@material-ui/core/styles";

import Context from "../context";
import PinIcon from "./PinIcon"
import MeIcon from "./MeIcon";
import Blog from "./Blog";
import { PINS } from "../graphql/queries";
import {DELETE_PIN} from "../graphql/mutations";
import {PIN_DELETED, PIN_ADDED} from "../graphql/subscriptions";
import {useClient} from "../hooks";

const initialViewPort = {
  zoom: 13,
  longitude: 122.4376,
  latitude: -37.8
};

const Map = ({ classes, location, onClickMap}) => {
  const {state, dispatch} = useContext(Context);
  const [viewPort, setViewPort]  = useState(initialViewPort);
  const client = useClient(state.token)
  const {currentPin, draftPin}  = state;

  const pinDeletedSubscription = useSubscription(
    PIN_DELETED,
    {
      onSubscriptionData({subscriptionData: data} = {data: {}}) {
        console.log(data)
        if (data.data.pinDeleted) {
          dispatch({type: "PIN_DELETED", deletedPin: data.data.pinDeleted});
        }
      }
    }
  );

  const pinAddedSubscription = useSubscription(
    PIN_ADDED,
    {
      onSubscriptionData({subscriptionData: data} = {data: {}}) {
        console.log({data})
        if (data.data.pinAdded) {
          console.log("has data")
          dispatch({type: "ADD_PIN", pin: data.data.pinAdded});
        }
      }
    }
  );

  useEffect(() => {
    async function getPins() {   
      if (!client) return;
      const {pins} = await client.request(PINS);
      dispatch({type: "SET_PINS", pins})
    }
    getPins();
  }, [client]);

  useEffect(() => {
    setViewPort({...location, zoom: 13})
  }, [location && location.latitude])

  const highlightIfRecent = (pin) =>{
    if (Date.now() - pin.createdAt < 60 * 30 * 1000) return "red";
    
    return "purple";
  };

  const isPinOwner = (pin, user) => {
    return pin.author._id === user._id
  }

  const setCurrentPin = (pin) => {
    dispatch({type: "SET_CURRENT_PIN", pin});
  }

  const deleteCurrentPin = async ({_id}) => {
    const variables = {pin: {_id}}
    const {deletePin: pinDeleted} = await client.request(DELETE_PIN, variables);
    if (pinDeleted) {
      dispatch({type: "SET_CURRENT_PIN"});
      dispatch({type: "DELETE_CURRENT_PIN", pin: pinDeleted});
    }
  }
  
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
        onInteractionStateChange={console.log}
        onLoad={console.log}
        onViewStateChange={console.log}
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
                <PinIcon
                  onClick={() => {
                    setCurrentPin(pin)
                  }}
                  color={highlightIfRecent(pin)} size="30"/>
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
      {
        currentPin && 
        <Popup
          latitude={currentPin.latitude}
          longitude={currentPin.longitude}
          anchor="top"
          closeOnClick={false}
          onClose={() => setCurrentPin()}
        >
          <img src={currentPin.image} className={classes.popupImage}/>
          <div className={classes.popupTab}>
            <Typography>
              longitude: {currentPin.longitude.toFixed(6)}
            </Typography>
            <Typography>
              latitude: {currentPin.latitude.toFixed(6)}
            </Typography>
            {
              isPinOwner(currentPin, state.currentUser) && 
              <div>
                <Button onClick={() => deleteCurrentPin(currentPin)} color="primary">
                  <DeleteIcon />
                </Button>
              </div>
            }
          </div>
        </Popup>
      }
      </ReactMapGL>
      <Blog pin={currentPin || draftPin} />
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
