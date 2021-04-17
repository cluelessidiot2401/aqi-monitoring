/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalContext } from "../context/GlobalState";

import React, { useState, useContext, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const DataFetcher = () => {
  const { addEntry, aqiArchive } = useContext(GlobalContext);

  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("ws://city-ws.herokuapp.com");
  // const messageHistory = useRef<any[]>([]);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);

  const { lastMessage } = useWebSocket(socketUrl);

  const componentsToRender = () => {
    const components: JSX.Element[] = [];
    for (let city in aqiArchive) {
      aqiArchive[city].forEach((entry) =>
        components.push(
          <>
            <h3>
              {city}: {entry.aqi}
            </h3>
          </>
        )
      );
      return components;
    }
  };

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      addEntry(lastMessage.data, lastMessage.timeStamp);
      componentsToRender();
      setMessageHistory((current) => {
        current.push(JSON.parse(lastMessage.data));
        return current;
      });
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(() => {
    if (socketUrl === "ws://nothing.com")
      setSocketUrl("ws://city-ws.herokuapp.com");
    else setSocketUrl("ws://nothing.com");
  }, []);

  let history = useHistory();
  const getTableComp = (): JSX.Element => {
    const getLastUpdated = (cur: Number, last: Number | any) => {
      if (!last) return new Date(cur as number).toUTCString();
      else {
        let diff: number = ((cur as number) - last) as number;
        if (0 < diff && diff < 2000) return "A few seconds ago";
        else if (2000 < diff && diff < 60000) return "A few minutes ago";
        else return new Date(diff as number).toUTCString();
      }
    };

    const components: JSX.Element[] = [];
    let count = 1;
    for (let city in aqiArchive) {
      components.push(
        <tr key={city} onClick={() => history.push(`/dashboard/${city}`)}>
          <td>{count}</td>
          <td>{city}</td>
          <td>{aqiArchive[city][aqiArchive[city].length - 1].aqi}</td>
          <td>
            {getLastUpdated(
              aqiArchive[city][aqiArchive[city].length - 1].time as number,
              aqiArchive[city].length >= 2
                ? (aqiArchive[city][aqiArchive[city].length - 2].time as number)
                : null
            )}
          </td>
        </tr>
      );
      ++count;
    }
    return <>{components}</>;
  };

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      {/* <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button> */}
      {/* <span>The WebSocket is currently {connectionStatus}</span> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>City</th>
            <th>Current AQI</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>{getTableComp()}</tbody>
      </Table>
    </div>
  );
};

export default DataFetcher;
