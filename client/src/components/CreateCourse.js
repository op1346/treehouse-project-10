import React, { Component } from "react";
import Form from "./Form";
import Data from '../Data';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    userId: '',
    name: '',
    errors: [],
  };

  constructor() {
    super()
    this.data = new Data();
  }

  componentDidMount() {
    const { context } = this.props;

    this.setState(() => {
      return {
        userId: context.authenticatedUser.id,
        name: context.authenticatedUser.Name
      };
    });
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        className="input-title course--title--input"
                        onChange={this.change}
                        placeholder="Course title..."
                      />
                    </div>
                    <p>By {this.state.name}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.change}
                        placeholder="Course description..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime}
                            className="course--time--input"
                            onChange={this.change}
                            placeholder="Hours"
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={materialsNeeded}
                            onChange={this.change}
                            placeholder="List materials..."
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
  //change method
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  //submit method
  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = context.authenticatedUser;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    // New Course
    context.data
      .createCourse(course, emailAddress, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("Course created");
          //get to courses main page
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };
  // cancel method
  cancel = () => {
    this.props.history.push('/');
  }
}