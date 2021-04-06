import React from "react";

function Search(props) {

  return (
    <input
    type="text"
      className="form-control"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
      onChange={props.filter}
    />

  )

}

export default Search;