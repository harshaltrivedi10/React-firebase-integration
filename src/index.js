import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProvider from './providers/postsProvider';
import UserProvider from './providers/userProvider';
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <UserProvider>
    <Router>
      <PostsProvider>
        <Application />
      </PostsProvider>
    </Router>
  </UserProvider>,
  document.getElementById('root')
);
