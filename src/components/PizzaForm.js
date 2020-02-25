import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={props.handleFormChange} type="text" className="form-control" placeholder='Pizza Topping' 
            value={props.pizza.topping} name='topping'/>
        </div> 
        <div className="col">
          <select onChange={props.handleFormChange} value={props.pizza.size} name='size' className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={props.handleFormChange} name='vegetarian' className="form-check-input" type="radio" value={true} checked={props.pizza.vegetarian && true}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={props.handleFormChange} name='vegetarian' className="form-check-input" type="radio" value={false} checked={!props.pizza.vegetarian && true}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleFormSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
