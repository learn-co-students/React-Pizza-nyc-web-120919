import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  
  state={
    id: "",
    topping: "",
    size: "",
    vegetarian: false
  }

  // the values were returning as true/false as strings for the vegetarian, but need to ensure that they are stored as booleans
  handleFormChange = (event) => {
    if (event.target.value === "true") {
      this.setState({[event.target.name]: true })
    } else if (event.target.value === "false") {
      this.setState({[event.target.name]: false})
    } else {

    this.setState({
      [event.target.name]: event.target.value
    })}
  }

  handleFormSubmit = () => {
    const pizzaObj = {...this.state} //{id: this.state.id, topping: this.state.topping, size: this.state.size, vegetarian: this.state.vegetarian}
    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pizzaObj)
    })
    .then(() => this.setState({
      id: "",
      topping: "",
      size: "",
      vegetarian: false
    }))
  }

  handleEditPizzaClick = (pizza) => {
    const { topping, size, vegetarian, id} = pizza
    this.setState({
      id: id,
      topping: topping,
      size: size,
      vegetarian: vegetarian
    })
  }
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleFormSubmit={this.handleFormSubmit} handleFormChange={this.handleFormChange} pizza={this.state}/>
        <PizzaList handleEditPizzaClick={this.handleEditPizzaClick}/>
      </Fragment>
    );
  }
}

export default App;
