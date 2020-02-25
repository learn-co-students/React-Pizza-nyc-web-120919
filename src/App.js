import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const URL = 'http://localhost:3000/pizzas'
class App extends Component {
  state = {
    pizzas: [],
    targetPizza: {}
  }

  componentDidMount() {
    fetch(URL)
      .then(resp => resp.json())
      .then(pizzas => {
        this.setState({ pizzas })
      })
  }

  updateTargetPizza = (targetPizza) => {
    this.setState((state) => ({ targetPizza }))
  }

  updateTargetPizzaValue = (key, value) => {
    this.setState((state) => ({
      targetPizza: { ...state.targetPizza, [key]: value }
    }), () => console.log(this.state))
  }

  submitPizza = (event) => {
    event.preventDefault()
    fetch(`${URL}/${this.state.targetPizza.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.targetPizza),
    })
    .then(resp => resp.json())
    .then(pizza => {
      const pizzas = this.state.pizzas.map(statePizza => {
        if(statePizza.id === pizza.id)
          return pizza;
        else
          return statePizza
      })
      this.setState((state) => ({ pizzas }))
    })
  }

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm targetPizza={this.state.targetPizza} updateTargetPizzaValue={this.updateTargetPizzaValue} submitPizza={this.submitPizza} />
        <PizzaList pizzas={this.state.pizzas} updateTargetPizza={this.updateTargetPizza} />
      </Fragment>
    );
  }
}

export default App;
