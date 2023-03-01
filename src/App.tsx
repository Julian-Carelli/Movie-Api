import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { PageDetails } from './Pages/PageDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path=":id" element={<PageDetails />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { App };