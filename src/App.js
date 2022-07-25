import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://laetitia-deliveroo-api.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="App">
      <img src="./images/logo-teal.svg" alt="" />
      <h1>{data.restaurant.name}</h1>
      <p>{data.restaurant.description}</p>
      <div>
        <div>
          {data.categories.map((categorie, index) => {
            return (
              <div key={index}>
                <h2>{categorie.name}</h2>
                <div>
                  {categorie.meals.map((title, index) => {
                    return (
                      <div key={index}>
                        <h3>{title.title}</h3>
                        <p>{title.description}</p>
                        <p>{title.price}</p>
                        <p>{title.popular ? <span>Populaire</span> : ""}</p>
                        <p>
                          {title.picture ? (
                            <img src={title.picture} alt="" />
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
