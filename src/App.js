import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "./images/logo-teal.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faStar, faListAlt);

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
      <header>
        <div className="top-bar">
          <div className="top-bar-center">
            <img src={logo} alt="logo Deliveroo" className="logo" />
          </div>
        </div>
      </header>
      <div className="restaurant-div">
        <div className="restaurant-infos">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div className="restaurant-info-picture">
          <img src={data.restaurant.picture} alt="" />
        </div>
      </div>

      <div className="main-content">
        <div className="menu-center">
          <div className="menu">
            {data.categories.map((categorie, index) => {
              return (
                <div key={index}>
                  <h2>{categorie.name}</h2>
                  <div className="menu-items">
                    {categorie.meals.map((title, index) => {
                      return (
                        <div key={index} className="card">
                          <div className="card-item">
                            <div className="card-text">
                              <h3>{title.title}</h3>
                              <p>{title.description}</p>
                              <span className="price">
                                {title.price.replace(".", ",")}€
                              </span>
                              <span className="popular">
                                {title.popular ? (
                                  <span className="star">
                                    <FontAwesomeIcon icon="fa-solid fa-star" />
                                    Populaire
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                            <div className="card-picture">
                              <>
                                {title.picture ? (
                                  <img src={title.picture} alt="" />
                                ) : (
                                  ""
                                )}
                              </>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="panier">
            <div>
              <button>Valider mon panier</button>
              <p>Votre panier est vide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
