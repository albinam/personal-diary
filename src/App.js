import './App.scss';
import RecordsList from "./pages/RecordsList/RecordsList";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecordFormPage from "./pages/RecordCreation/RecordFormPage";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                       <Route exact path="/" element={<RecordsList/>}/>
                        <Route path="/add-record" element={<RecordFormPage/>}/>
                        <Route path="/edit-record/:id" element={<RecordFormPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
