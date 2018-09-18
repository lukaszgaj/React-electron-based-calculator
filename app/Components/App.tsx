import * as React from 'react';
import './css/App.css';

class App extends React.Component {
    render() {
        return <div className="app">
            <div className="buttons">
                <div className="row">
                    <button>C</button>
                    <button>V</button>
                    <button>%</button>
                    <button>:</button>
                </div>
                <div className="row">
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>x</button>
                </div>
                <div className="row">
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>-</button>
                </div>
                <div className="row">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>+</button>
                </div>
                <div className="row">
                    <button>0</button>
                    <button>.</button>
                    <button>=</button>
                </div>
            </div>
        </div>
    }
}

export default App;