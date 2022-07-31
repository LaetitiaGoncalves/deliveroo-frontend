import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "./images/logo-teal.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faListAlt,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faStar, faListAlt, faPlus, faMinus);

const App = () => {
  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [basket, setBasket] = useState([]);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
      total += basket[i].price * basket[i].quantity;
    }
    return total.toFixed(2);
  };

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
            {data.categories.map((categorie, mainIndex) => {
              return (
                categorie.meals.length > 0 && (
                  <div key={mainIndex}>
                    <h2>{categorie.name}</h2>
                    <div className="menu-items">
                      {categorie.meals.map((meal, index) => {
                        return (
                          <div
                            key={index}
                            className="card"
                            onClick={() => {
                              const newBasket = [...basket];

                              let alreadyInBasket = false;

                              for (let i = 0; i < newBasket.length; i++) {
                                if (newBasket[i].id === meal.id) {
                                  newBasket[i].quantity++;
                                  alreadyInBasket = true;
                                }
                              }

                              if (alreadyInBasket === false) {
                                newBasket.push({
                                  title: meal.title,
                                  price: meal.price,
                                  id: meal.id,
                                  quantity: 1,
                                });
                              }

                              setBasket(newBasket);
                            }}
                          >
                            <div className="card-item">
                              {meal.picture ? (
                                <div className="card-with-picture">
                                  <div className="card-text">
                                    <h3>{meal.title}</h3>

                                    {meal.description ? (
                                      <p>{meal.description}</p>
                                    ) : (
                                      ""
                                    )}

                                    <span className="price">
                                      {meal.price.replace(".", ",")}€
                                    </span>
                                    <span className="popular">
                                      {meal.popular ? (
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
                                    {meal.picture ? (
                                      <img src={meal.picture} alt="" />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className="card-text">
                                    <h3>{meal.title}</h3>
                                    {meal.description ? (
                                      <p>{meal.description}</p>
                                    ) : (
                                      ""
                                    )}
                                    <span className="price">
                                      {meal.price.replace(".", ",")}€
                                    </span>
                                    <span className="popular">
                                      {meal.popular ? (
                                        <span className="star">
                                          <FontAwesomeIcon icon="fa-solid fa-star" />
                                          Populaire
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="basket">
            <div className="basket-item">
              <div className="top-container">
                {basket.length === 0 ? (
                  <button className="disabled">Valider mon panier</button>
                ) : (
                  <button className="allowed">Valider mon panier</button>
                )}
              </div>
              <div className="bottom-container">
                <div className="empty-basket">
                  <div className="basket-items">
                    <div>
                      {basket.map((basketItem, index) => {
                        return (
                          <div className="counter-basket" key={index}>
                            <div className="counter">
                              <button
                                onClick={() => {
                                  const newBasket = [...basket];
                                  if (basket[index].quantity === 1) {
                                    newBasket.splice(index, 1);
                                  } else {
                                    newBasket[index].quantity--;
                                  }
                                  setBasket(newBasket);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon="fa-solid fa-minus"
                                  style={{ color: "#00cdbd" }}
                                />
                              </button>
                              <p>{basketItem.quantity}</p>
                              <button
                                onClick={() => {
                                  const newBasket = [...basket];
                                  newBasket[index].quantity++;
                                  setBasket(newBasket);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon="fa-solid fa-plus"
                                  style={{ color: "#00cdbd" }}
                                />
                              </button>
                            </div>

                            <span className="basket-title">
                              {basketItem.title}
                            </span>
                            <span className="basket-price">
                              {basketItem.price.replace(".", ",")} €
                            </span>
                          </div>
                        );
                      })}
                      {basket.length === 0 ? (
                        <p className="basket-empty">Votre panier est vide</p>
                      ) : (
                        <>
                          <div className="sub-total">
                            <p>
                              <span className="basket-title">Sous total :</span>
                              <span className="basket-price">
                                {getTotal().replace(".", ",")} €
                              </span>
                            </p>
                            <p>
                              <span className="basket-title">
                                Frais de livraison :
                              </span>
                              <span className="basket-price">2,50 €</span>
                            </p>
                          </div>
                          <div className="total">
                            <h3>
                              <span className="basket-title">Total :</span>
                              <span className="basket-price">
                                {(Number(getTotal()) + 2.5)
                                  .toFixed(2)
                                  .replace(".", ",")}{" "}
                                €
                              </span>
                            </h3>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
