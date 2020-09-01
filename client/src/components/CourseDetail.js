import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      user: '',
      authenticatedUser: '',
      courseId: ''
    }
  }

  async componentDidMount() {
    const { context } = this.props;
    const { id } = this.props.match.params;

    context.data
      .getCourseDetails(id)
      .then(response => {
        this.setState({
          title: response.title,
          description: response.description,
          estimatedTime: response.estimatedTime,
          materialsNeeded: response.materialsNeeded,
          user: response.user,
          authenticatedUser: context.authenticatedUser,
          courseId: id
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/errors');
      });
  }

  render() {
    const {
      title,
      courseId,
      authenticatedUser,
      user
    } = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {authenticatedUser ? (
                  authenticatedUser.Email === user.emailAddress ? (
                    <React.Fragment>
                      <Link
                        className="button"
                        to={`/courses/${courseId}/update`}>
                        Update Course
                      </Link>
                      <Link
                        className="button"
                        onClick={this.deleteCourse}
                        to={`/courses/delete/${courseId}`}
                      >
                        Delete Course
                      </Link>
                    </React.Fragment>
                  ) : (
                    <hr />
                  )
                ) : (
                  <hr />
                )}
              </span>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>
                By {this.state.user.firstName} {this.state.user.lastName}
              </p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.description}/>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                  <ReactMarkdown source={this.state.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }


deleteCourse = () => {
  const { context } = this.props;
  const courseId = this.props.match.params.id;

  if (context.authenticatedUser) {
    const { emailAddress, password } = context.authenticatedUser;

    context.data
      .deleteCourse(courseId, emailAddress, password)
      .then(errors => {
        if (errors && errors.length > 0) {
          this.setState({ errors });
        } else {
          this.props.history.push('/')
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
    }
  }
}