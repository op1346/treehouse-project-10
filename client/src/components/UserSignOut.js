import React from 'react';
import { Redirect } from 'react-router-dom';
export default ({context}) => {
  userEffect(() => context.actions.signOut());

  return (
    <Redirect to="/" />
  )
}

export default ({ default }) => {
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}
