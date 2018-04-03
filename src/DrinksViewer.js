import React from "react";
import classNames from "classnames";
import { DEFAULT_DRINKS } from "./Data.js";

export default class DrinksViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingDrinkId: null
    };

    this.renderCurrentDrink = this.renderCurrentDrink.bind(this);
    this.renderDrinks = this.renderDrinks.bind(this);
    this.handleEditDrink = this.handleEditDrink.bind(this);
  }

  render() {
    return (
        <div className="page">
          <div className="columns">
            <div className="column">
              <div className="column-name">All Drinks</div>
              <div className="column-content">
                <div className="flex-grow">{this.renderDrinks()}</div>
                <div
                    className="big-button"
                    onClick={() => this.props.onOpenScreen("createDrink")}
                >
                  Create New Drink
                </div>
              </div>
            </div>

            <div className="column">
              <div className="column-name">Current Drink</div>
              <div className="column-content">{this.renderCurrentDrink()}</div>
              {this.state.viewingDrinkId !== null && [
                <div
                    className="button"
                    onClick={() =>
                        this.handleEditDrink(
                            DEFAULT_DRINKS[this.state.viewingDrinkId]
                        )
                    }
                >
                  Edit Drink
                </div>
              ]}
            </div>
          </div>
        </div>
    );
  }

  renderCurrentDrink() {
    const { drinks } = this.props;
    const { viewingDrinkId } = this.state;

    if (viewingDrinkId === null) {
      return (
          <div className="needed" key="drinksContent">
            Select a drink to view its recipe here.
          </div>
      );
    }

    const drink = drinks[viewingDrinkId];

    return (
        <div className="steps">
          {drink.steps.map((step, index) => (
              <div className="step" key={index}>
                <span className="number">{index + 1}</span>
                <div>{step}</div>
              </div>
          ))}
        </div>
    );
  }

  renderDrinks() {
    const { drinks } = this.props;

    let drinksContent;

    if (drinks.length === 0) {
      return <div className="needed">Drinks you create will appear here.</div>;
    } else {
      drinksContent = (
          <div key="drinksContent">
            {drinks.map((drink, id) => (
                <div
                    className={classNames({
                      button: true,
                      "button-selected": this.state.viewingDrinkId === id
                    })}
                    onClick={this.handleDrinkClick.bind(this, id)}
                    key={id}
                >
                  {drink.name}
                </div>
            ))}
          </div>
      );
    }

    return [
      drinksContent,
      <div className="divider" key="divider-1" />,
      <div key="what-can-i-make">
        <div
            className="button"
            onClick={() => this.props.onOpenScreen("whatCanIMake")}
        >
          What Can I Make?
        </div>
        <div className="explanation-section">
          Got some ingredients? See what you can use them to make.
        </div>
      </div>,
      <div className="divider" key="divider-2" />,
      <div key="search-drinks">
        <div
            className="button"
            onClick={() => this.props.onOpenScreen("searchDrinks")}
        >
          Search For Drink
        </div>
        <div className="explanation-section">Find a drink by its recipe</div>
      </div>
    ];
  }

  handleEditDrink(drink) {
    this.props.selectDrink(drink);
    // this.props.onOpenScreen("createDrink");
  }

  handleDrinkClick(drinkId) {
    this.setState({
      viewingDrinkId: this.state.viewingDrinkId === drinkId ? null : drinkId
    });
  }
}
