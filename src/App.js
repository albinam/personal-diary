import './App.scss';
import RecordsList from "./pages/RecordsList/RecordsList";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecordCreation from "./pages/RecordCreation/RecordCreation";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                       <Route exact path="/" element={<RecordsList/>}/>
                        <Route path="/add-record" element={<RecordCreation/>}/>
                        <Route path="/edit-record/:id" element={<RecordCreation/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
