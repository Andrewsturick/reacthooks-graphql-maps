import {useEffect, useState} from "react";
import { getGraphQLClient } from "./helpers";

const BASE_URL = "http://as.be.ngrok.io/graphql";

const useClient = (userToken, url = BASE_URL) => {
    const [token, setToken] = useState(null);
    const [client, setClient] = useState(null);
    useEffect(() => {
        setToken(userToken);
        setClient(getGraphQLClient(userToken, BASE_URL));
    }, [userToken]);

    return client;
    
};

export {useClient};