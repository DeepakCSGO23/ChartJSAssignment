// SelectComponent.js
import React from "react";
//Select child component
function Select({ changeDataSet }) {
  window.onclick = function (event) {
    const target = event.target;
    const upArrow = document.querySelector(".arrow");
    //When the select field is focused
    if (target.id == "select" || target.className == "arrow") {
      upArrow.classList.add("downarrow");
    }
    //Select field is not focused
    else {
      upArrow.classList.remove("downarrow");
    }
  };
  return (
    <div className="select-container">
      <select id="select" onChange={changeDataSet}>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="stock">Stock</option>
      </select>
      <div className="arrow">▲</div>
    </div>
  );
}

export default Select;
