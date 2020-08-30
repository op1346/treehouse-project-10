import React, { Component } from "react";
import Form from "./Form";
// class to update the course
export default class UpdateCourse extends Component {
  state = {
    courseId: "",
    title: "",
    firstName: "",
    lastName: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const { id } = this.props.match.params;

    context.data
      // Get the course details by its id and update
      .getCourseDetails(id)
      .then((response) => {
        if (response) {
          const user = response.course.owner;
          this.setState({
            courseId: id,
            title: response.course.title,
            courseByFirstName: user.firstName,
            courseByLastName: user.lastName,
            courseByEmailAddress: user.emailAddress,
            description: response.course.description,
            estimatedTime: response.course.estimatedTime,
            materialsNeeded: response.course.materialsNeeded,
            authenticatedUserEmailAddress: authenticatedUser.emailAddress,
            userId: response.course.userId,
          });
        } else {
          this.props.history.push("/notfound");
        }

        if (
          this.state.courseByEmailAddress !==
          this.state.authenticatedUserEmailAddress
        ) {
          this.props.history.push("/notfound");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

  render() {
    const {
      title,
      courseByFirstName,
      courseByLastName,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.update}
          submitButtonText="Update Course"
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
                      onChange={this.change}
                      className="input-title course--title--input"
                      placeholder="Course title..."
                    />
                  </div>
                  <p>
                    By{courseByFirstName} {courseByLastName}{" "}
                  </p>
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
                    />
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
                          className="course--time--input"
                          value={estimatedTime}
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
                          type="text"
                          value={materialsNeeded}
                          onChange={this.change}
                          placeholder="Materials"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value || "",
      };
    });
  };

  update = () => {
    const { context } = this.props;
    const { emailAddress } = context.authenticatedUser;
    const { password } = context.authenticatedUser;

    const {
      courseId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data
      .updateCourse(courseId, updatedCourse, emailAddress, password)
      .then((errors) => {
        if (errors.errors) {
          this.setState({ errors: errors.errors });
        } else {
          const id = this.state.courseId;
          this.props.history.push(`/courses/${id}`);
        }
      })
      //errors
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  // Cancel function
  cancel = () => {
    const id = this.state.courseId;
    this.props.history.push(`/courses/${id}`);
  };
}