import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    pizza: {}
  }

  editPizza = (pizza) => {
    this.setState({ pizza: pizza})
  }

  onType = (event) => {
    const pizzaName = event.target.value
    this.setState((prevState) => {
      return {pizza: {...prevState.pizza, topping: pizzaName}}
    })
  }

  onDropdown = (event) => {
    const pizzaSize = event.target.value
    this.setState((prevState) => {
      return {pizza: {...prevState.pizza, size: pizzaSize}}
    })
  }

  onVegetarian = (event) => {
    const pizzaVeg = event.target.value === "Vegetarian"
    this.setState((prevState) => {
      return {pizza: {...prevState.pizza, vegetarian: pizzaVeg}}
    })
  }



  submitForm = () => {
    if(this.state.pizza.id){
      const pizzaId = this.state.pizza.id 
      fetch(`http://localhost:3000/pizzas/${pizzaId}`, {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(this.state.pizza) 
      })
      .then(resp => resp.json())
      .then(pizzaItem => {
        const newPizzaArray = this.state.pizzas.map(pizza => {
          if(pizza.id === pizzaId){
            return pizzaItem
          } else {
            return pizza 
          }
        })
        this.setState({pizzas: newPizzaArray})
      })
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then(response => response.json())
      .then(pizzas => this.setState({ pizzas }));
  }


  render() {
    console.log(this.state.pizzas)
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizza} onType={this.onType} onDropdown={this.onDropdown} onVegetarian={this.onVegetarian}
        submitForm={this.submitForm}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
