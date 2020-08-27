import React from 'react';
import { Link } from 'react-router-dom';

export default ({context}) => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {context.authenticatedUser ?
              <React.Frament>
                <span>Welcome, {context.authenticatedUser.firstName}!</span>
                <Link className='signout' to='/signout'>Sign Out</Link>
              </React.Frament>
            :
            <React.Fragment>
              <Link className='signup' to='/signup'>Sign Up</Link>
              <Link className='signin' to='/signin'>Sign In</Link>
            </React.Fragment>
            }
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};
