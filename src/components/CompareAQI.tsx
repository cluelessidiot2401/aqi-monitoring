import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GlobalContext } from "../context/GlobalState";
import "./CompareAQI.scss";

export const CompareAQI = () => {
  let params = useParams<{ city1: string; city2: string }>();
  const { aqiArchive } = useContext(GlobalContext);

  const [myData, setMyData] = useState<any[]>([]);

  useEffect(() => {
    let cityName1 = params.city1;
    let cityName2 = params.city2;

    let i = 0,
      j = 0;
    let currentAQI_City1: number = -1;
    let currentAQI_City2: number = -1;
    let tmpData: any[] = [];

    if (aqiArchive[cityName1] && aqiArchive[cityName2]) {
      while (
        i < aqiArchive[cityName1].length &&
        j < aqiArchive[cityName2].length
      ) {
        if (aqiArchive[cityName1][i].time <= aqiArchive[cityName2][j].time) {
          let dataPoint: any = {
            name: new Date(
              aqiArchive[cityName1][i].time as number
            ).toUTCString(),
          };
          currentAQI_City1 = aqiArchive[cityName1][i].aqi;
          dataPoint[cityName1] = currentAQI_City1;
          dataPoint[cityName2] = currentAQI_City2;
          ++i;
          if (currentAQI_City1 !== -1 && currentAQI_City2 !== -1)
            tmpData.push(dataPoint);
        } else {
          let dataPoint: any = {
            name: new Date(
              aqiArchive[cityName2][j].time as number
            ).toUTCString(),
          };
          currentAQI_City2 = aqiArchive[cityName2][j].aqi;
          dataPoint[cityName1] = currentAQI_City1;
          dataPoint[cityName2] = currentAQI_City2;
          ++j;
          if (currentAQI_City1 !== -1 && currentAQI_City2 !== -1)
            tmpData.push(dataPoint);
        }
      }
      setMyData(tmpData);
    }
  }, [aqiArchive, params]);

  return (
    <div className="container">
      <ResponsiveContainer width="100%" height="100%">
        <div>
          <LineChart
            width={window.innerWidth * 0.8}
            height={window.innerHeight * 0.6}
            data={myData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={params.city2}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey={params.city1} stroke="#82ca9d" />
          </LineChart>
        </div>
      </ResponsiveContainer>
    </div>
  );
};
