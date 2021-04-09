import React, { Component } from "react";
import API from "../utils/API";
import Search from "./Search"


class employeeTable extends Component {
  state = {
    results: [],
    error: "" ,
    filter:[],
    sorted: false,
    search: "",

  };
  componentDidMount() {
    API.getEmployees()
    .then(
      (result) => {
        this.setState({
          results: result.data.results
        });
      },(error) => {
        this.setState({
          error
        });
      }
    )
  }

  sort = () => {
    var sortedResult ;
    if (this.state.sorted === false){
          sortedResult = this.state.results.sort(function (a, b) {
           if (a.name.last < b.name.last) {
             return -1;
           }
           if (a.name.last > b.name.last) {
             return 1;
           }
           return 0;
         });
    } else {
      sortedResult = this.state.results.reverse((a, b) => {
        if (a.name.last < b.name.last) return 1;
        if (a.name.last > b.name.last) return -1;
        return 0;
      });
    }
    this.setState({
      results: sortedResult,
      sorted: !this.state.sorted,
    })
  }

  filter = (event) => {
    var searchInput = event.target.value;
    const filteredResult = this.state.results.filter(employee=>
      employee.name.first.includes(searchInput) || employee.name.last.includes(searchInput) || employee.location.country.includes(searchInput)
    )
    this.setState({
      search: searchInput,
      filter: filteredResult,
    })
  }

  render (){
    return (
      <div className="container">
        <Search filter={this.filter} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col" onClick={this.sort}>
                Last Name
              </th>
              <th scope="col">City</th>
              <th scope="col">County</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Cell Number</th>
            </tr>
          </thead>
          <tbody>
            {
            this.state.filter.length > 0 ? this.state.filter.map((results) => (
                <tr>
                  <td>{results.name.first}</td>
                  <td>{results.name.last}</td>
                  <td>{results.location.city}</td>
                  <td>{results.location.country}</td>
                  <td>{results.email}</td>
                  <td>{results.phone}</td>
                  <td>{results.cell}</td>
                </tr>
              )) :
            this.state.results.length > 0 &&
              this.state.results.map((results) => (
                <tr>
                  <td>{results.name.first}</td>
                  <td>{results.name.last}</td>
                  <td>{results.location.city}</td>
                  <td>{results.location.country}</td>
                  <td>{results.email}</td>
                  <td>{results.phone}</td>
                  <td>{results.cell}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

}

export default employeeTable;