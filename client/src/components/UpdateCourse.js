import React, { Component } from "react";
import Form from "./Form";

// class to update the course
export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      user: "",
      userId: "",
      errors: [],
    }
  }

  componentDidMount() {
    const { context } = this.props;
    const authUser = this.props.context.authenticatedUser;

    context.data
      // Get the course details by its id and update
      .getCourseDetails(this.props.match.params.id)
      .then(course => {
        if (course) {
          this.setState({
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            user: course.user,
            courseId: course.id,
            userId: course.userId
          });
        }
        if (!authUser || authUser.id !== this.state.user.id){
          this.props.history.push('/NotFound')
        }
        if (!course) {
          this.props.history.push('/NotFound')
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error')
      });
    }

  render() {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
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
                    By {context.authenticatedUser.Name}
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

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value || "",
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = context.authenticatedUser;
    const courseId = this.props.match.params.id;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    };

    context.data
      .updateCourse(courseId, course, emailAddress, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/NotFound');
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
    const courseId = this.props.match.params.id;
    this.props.history.push(`/courses/${courseId}`);
  };
}