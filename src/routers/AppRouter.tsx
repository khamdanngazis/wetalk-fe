// src/routers/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Update the path based on where your store is located
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Main from '../pages/MainPage';
import NotFound from '../pages/NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
          {/* You can add more routes here */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRouter;