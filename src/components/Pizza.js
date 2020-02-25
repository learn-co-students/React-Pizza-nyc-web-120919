import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? "Vegetarian" : "So Meaty"}</td>
      <td><button type="button" onClick={() => props.handleEditPizzaClick(props)} className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
