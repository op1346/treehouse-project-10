import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = async () => {

  }
}
export default Courses;