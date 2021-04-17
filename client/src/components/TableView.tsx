/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { getCSSStyle } from "../helpers/aqiColorMapper";
import increaseTrend from "../static-files/imgs/increase.png";
import decreaseTrend from "../static-files/imgs/decrease.png";
import "./TableView.scss";

const TableView = () => {
  const [socketUrl] = useState("ws://city-ws.herokuapp.com");

  const { lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      addEntry(lastMessage.data, lastMessage.timeStamp);
    }
  }, [lastMessage]);

  const { aqiArchive, addEntry } = useContext(GlobalContext);

  const getProperIcon = (
    currentAQI: number,
    previousAQI: number | null
  ): JSX.Element => {
    if (!previousAQI) {
      return <></>;
    }
    if (currentAQI > previousAQI) return <img src={increaseTrend} alt="" />;
    else if (currentAQI < previousAQI)
      return <img src={decreaseTrend} alt="" />;
    return <></>;
  };

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
        <tr
          key={city}
          onClick={() => history.push(`/dashboard/${city}`)}
          style={getCSSStyle(
            aqiArchive[city][aqiArchive[city].length - 1].aqi as number
          )}
        >
          <td>
            <h4>{count}</h4>
          </td>
          <td>
            <h4>{city}</h4>
          </td>
          <td>
            <h4>{aqiArchive[city][aqiArchive[city].length - 1].aqi}</h4>
            {/* {getProperIcon(
              aqiArchive[city][aqiArchive[city].length - 1].time as number,
              aqiArchive[city].length >= 2
                ? (aqiArchive[city][aqiArchive[city].length - 2].time as number)
                : null
            )} */}
          </td>
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={
              <Tooltip id={`tooltip-${"bottom"}`}>
                {new Date(
                  (aqiArchive[city][aqiArchive[city].length - 1]
                    .time as number) as number
                ).toUTCString()}
              </Tooltip>
            }
          >
            <td>
              <h4>
                {getLastUpdated(
                  aqiArchive[city][aqiArchive[city].length - 1].time as number,
                  aqiArchive[city].length >= 2
                    ? (aqiArchive[city][aqiArchive[city].length - 2]
                        .time as number)
                    : null
                )}
              </h4>
            </td>
          </OverlayTrigger>
        </tr>
      );
      ++count;
    }
    return <>{components}</>;
  };

  return (
    <div>
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

export default TableView;
