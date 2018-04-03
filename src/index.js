//
// Instructions in Instructions.txt
//

import React from "react";
import { render } from "react-dom";

import DrinksViewer from "./DrinksViewer";
import DrinkBuilder from "./DrinkBuilder";
import { DEFAULT_DRINKS } from "./Data.js";
require("./Styles.css");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let drinks = DEFAULT_DRINKS;
    const localStorageDrinks = localStorage.getItem("drinks");
    if (localStorageDrinks) {
      drinks = JSON.parse(localStorageDrinks);
    }

    this.state = {
      isCreatingDrink: false,
      isSearchingForDrink: false,
      isInWhatCanIMake: false,
      drinks,
      selectedDrink: DEFAULT_DRINKS[1]
    };

    this.handleOpenScreen = this.handleOpenScreen.bind(this);
    this.handleSaveDrink = this.handleSaveDrink.bind(this);
    this.handleSelectDrink = this.handleSelectDrink.bind(this);
    this.handleCloseScreen = this.handleCloseScreen.bind(this);
  }

  render() {
    const {
      drinks,
      isCreatingDrink,
      isSearchingForDrink,
      isInWhatCanIMake,
      selectedDrink
    } = this.state;

    return (
      <div className="app-container flex-stack">
        <div className="header">
          <b>Terrain</b> Drink Builder <em>Coding Challenge</em>
        </div>
        <div className="flex-grow">
          <DrinksViewer
            drinks={drinks}
            isCreatingDrink={isCreatingDrink}
            onOpenScreen={this.handleOpenScreen}
            selectDrink={this.handleSelectDrink}
          />
          <DrinkBuilder
            isCreatingDrink={isCreatingDrink}
            isSearchingForDrink={isSearchingForDrink}
            isInWhatCanIMake={isInWhatCanIMake}
            onSaveDrink={this.handleSaveDrink}
            onCancel={this.handleCloseScreen}
            drinks={drinks}
            selectedDrink={selectedDrink}
          />
        </div>
      </div>
    );
  }

  handleOpenScreen(screen) {
    this.setState({
      isCreatingDrink: screen === "createDrink",
      isSearchingForDrink: screen === "searchDrinks",
      isInWhatCanIMake: screen === "whatCanIMake"
    });
  }

  handleSaveDrink(drink) {
    const drinks = this.state.drinks.concat([drink]);
    this.setState({
      isCreatingDrink: false,
      drinks
    });
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }

  handleSelectDrink(drink) {
    this.setState({
      isCreatingDrink: true,
      isSearchingForDrink: false,
      isInWhatCanIMake: false,
      selectedDrink: drink
    });
  }

  handleCloseScreen() {
    this.handleOpenScreen(null);
  }
}

render(<App />, document.getElementById("root"));
