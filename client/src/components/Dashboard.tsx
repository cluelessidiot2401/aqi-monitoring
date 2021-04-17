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

export const Dashboard = () => {
  let params = useParams<{ city: string }>();
  const { aqiArchive } = useContext(GlobalContext);

  const [myData, setMyData] = useState<any[]>([]);

  useEffect(() => {
    let cityName = params.city;
    if (aqiArchive[cityName]) {
      let tmpData: any[] = [];
      aqiArchive[cityName].forEach((entry) => {
        let dataPoint: any = {
          name: new Date(entry.time as number).toUTCString(),
          amount: entry.aqi,
        };
        dataPoint[cityName] = entry.aqi;
        tmpData.push(dataPoint);
      });
      console.log(tmpData);
      setMyData(tmpData);
    }
  }, [aqiArchive, params]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div>
        <LineChart
          width={500}
          height={300}
          data={myData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={params.city} stroke="#82ca9d" />
        </LineChart>
      </div>
    </ResponsiveContainer>
  );
};
