import "./styles.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
//Child components
import Button from "./child/Button";
import Select from "./child/Select";
function App() {
  //Parent contains all the state
  //To store api response Data
  const [userData, setUserData] = useState([]);
  //Index used to add new Data
  const [currentIndex, setCurrentIndex] = useState(10);
  //To set ChartData & we first define the default chartData value
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price of Product",
        data: [],
        backgroundColor: ["rgba(111, 63, 88, 1)"],
        borderWidth: 2,
        borderColor: "black",
      },
    ],
  });
  //Data for the title & label
  const [titleData, setTitleData] = useState("Price");
  useEffect(() => {
    //Fake API call
    const getInfo = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data.products;
      setUserData(data);
      //Storing Products and Prices for the first Render
      const products = [];
      const prices = [];
      for (const d of data) {
        products.push(d.title);
        prices.push(d.price);
      }
      //Chart Data at first Render
      setChartData({
        labels: products.slice(0, 5),
        datasets: [
          {
            label: "Price of Product",
            data: prices,
            backgroundColor: ["rgba(111, 63, 88, 1)"],
            borderWidth: 2,
            borderColor: "black",
          },
        ],
      });
    };
    //Calls the API and stores the data in userData & the products,prices are extracted from the userData & then setup default chartData
    getInfo();
  }, []);
  //When changing the Dataset
  function changeDataSet(e) {
    let newValue = [];
    let title;
    if (e.target.value == "rating") {
      newValue = userData.map((data) => data.rating);
      title = "Rating";
    } else if (e.target.value == "stock") {
      newValue = userData.map((data) => data.stock);
      title = "Stock";
    } else if (e.target.value == "price") {
      newValue = userData.map((data) => data.price);
      title = "Price";
    }
    //Changing the State of the title
    setTitleData(title);
    //Changing the chartData but changing only the data & label keeping previous chartData the same
    setChartData({
      //Same labels i.e x-axis Product Name
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: newValue,
          label: `${title} of Products`,
        },
      ],
    });
  }
  function addData() {
    // Add new data in the x-axis
    //End of Product data
    if (currentIndex == 29) {
      alert("No more Products!");
      return;
    }
    setCurrentIndex((prevCount) => prevCount + 1);
    const newData = {
      //Adding new Product
      labels: [...chartData.labels, userData[currentIndex].title],
      datasets: chartData.datasets,
    };
    setChartData(newData);
  }
  //Changing arrow direction in the dropdown window when toggle happens
  function changeDirection() {
    const t = document.querySelector(".arrow");
    t.classList.toggle("downarrow");
  }
  return (
    <div className="parent-container">
      {/* Changing Parent State from actions on the child components */}
      <Button addData={addData} />
      <Select changeDataSet={changeDataSet} />
      {/* Container for the Canvas */}
      <div className="chart-area">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `${titleData} of Products`,
                font: {
                  size: 30,
                },
              },
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
