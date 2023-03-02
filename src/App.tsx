import { HashRouter, Routes, Route } from 'react-router-dom';
import { MovieContextProvider } from './context/movieContextProvider';
import { Home } from './pages/home';
import { Navbar } from './components/Navbar/index';
import { PageDetails } from './pages/pageDetails';

function App() {
  return (
    <>
      <HashRouter>
        <MovieContextProvider>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/movie/:name" element={<PageDetails />} />
              <Route path="/tv/:name" element={<PageDetails />} />
            </Route>
          </Routes>
        </MovieContextProvider>
      </HashRouter>
    </>
  );
}

export { App };
