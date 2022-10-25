import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import RecordsList from './pages/RecordsList/RecordsList';
import store from './redux/store';
import RecordFormPage from './pages/RecordCreation/RecordFormPage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<RecordsList />} />
            <Route path="/add-record" element={<RecordFormPage />} />
            <Route path="/edit-record/:id" element={<RecordFormPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
