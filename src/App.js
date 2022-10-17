import './App.scss';
import RecordsList from "./pages/RecordsList/RecordsList";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <RecordsList/>
            </Provider>
        </div>
    );
}

export default App;
