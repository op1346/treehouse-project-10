import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
  state = {
    courses: []
  };

  componentDidMount() {
    this.getCourses();
  }

  getCourses = async () => {
    const { context } = this.props;
    try {

    } catch (error) {

    }
  }

  render() {
    return (
    );
  }
}
export default Courses;