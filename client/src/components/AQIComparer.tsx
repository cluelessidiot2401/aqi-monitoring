import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import "./AQIComparer.scss";

const AQIComparer = () => {
  const { aqiArchive } = useContext(GlobalContext);

  const [cityList, setCityList] = useState<string[]>([]);
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");

  useEffect(() => {
    let cityListTmp: string[] = [];
    for (let city in aqiArchive) cityListTmp.push(city);
    setCityList(cityListTmp);
  }, [aqiArchive]);

  useEffect(() => {
    if (city1 === "" || !city1) setCity1(cityList[0]);
    if (city2 === "" || !city2) setCity2(cityList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityList]);

  return (
    <div>
      <Form>
        <Form.Group controlId="City1">
          <label htmlFor="city1">Choose a city:</label>
          <select
            name="city1"
            id="city1"
            onChange={(e) => setCity1(e.target.value)}
            defaultValue={cityList[0]}
          >
            {cityList.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Form.Group>

        <Form.Group controlId="City2">
          <label htmlFor="city2">Choose another city:</label>
          <select
            name="city2"
            id="city2"
            onChange={(e) => setCity2(e.target.value)}
            defaultValue={cityList[0]}
          >
            {cityList.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Form.Group>

        <Link to={`/compareAQI/${city1}/${city2}`}>
          <h3>Compare</h3>
        </Link>
      </Form>
    </div>
  );
};

export default AQIComparer;
