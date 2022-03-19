import React from 'react'

function DropdownButton(props) {
  const options = props.options;
  const parsedDropDownItem = options.map()
  return (
    <article className="card__container">
    <select className="card__dropdown--left">
      <option>

      </option>
    </select>
  </article>
  )
}

export default DropdownButton