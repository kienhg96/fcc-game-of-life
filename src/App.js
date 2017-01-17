import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        let rows = 15;
        let cols = 15;

        let data = [];
        for (let i = 0; i < rows; i++) {
            let tmp = [];
            for (let j = 0; j < cols; j++) {
                tmp.push(0);
            }
            data.push(tmp);
        }
        this.state = {
            rows: rows,
            cols: cols,
            data: data,
            interval: null,
            count: 0,
            speed: 2
        }
        this.onClick = this.onClick.bind(this);
        this.calcNeighbor = this.calcNeighbor.bind(this);
        this.run = this.run.bind(this);
    }

    reRender(rows, cols) {
        let data = [];
        for (let i = 0; i < rows; i++) {
            let tmp = [];
            for (let j = 0; j < cols; j++) {
                tmp.push(0);
            }
            data.push(tmp);
        }
        this.setState({
            rows: rows,
            cols: cols,
            data: data,
            interval: null,
            count: 0
        });
    }

    onClick(i, j) {
        let newData = Object.assign([], this.state.data);
        if (newData[i][j] === 0) {
            newData[i][j] = 1;
        } else {
            newData[i][j] = 0;
        }
        this.setState({
            data: newData,
        });
    }

    run() {
        let interval = setInterval(() => {
            let arrNeighbor = [];
            let newData = Object.assign([], this.state.data);
            for (let i = 0; i < this.state.rows; i++) {
                let tmp = [];
                for (let j = 0; j < this.state.cols; j++) {
                    tmp.push(this.calcNeighbor(i, j));
                }
                arrNeighbor.push(tmp);
            }
            for (let i = 0; i < this.state.rows; i++) {
                for (let j = 0; j < this.state.cols; j++) {
                    if (newData[i][j] === 1) {
                        if (arrNeighbor[i][j] < 2 || arrNeighbor[i][j] > 3) {
                            newData[i][j] = 0;
                        }
                    } else {
                        if (arrNeighbor[i][j] === 3) {
                            newData[i][j] = 1;
                        }
                    }
                }
            }
            this.setState({
                data: newData,
                count: this.state.count + 1
            });
        }, Math.floor(2000 / this.state.speed));
        return interval;
    }

    calcNeighbor(i, j) {
        let s = 0;
        if (i - 1 >= 0) {
            if (this.state.data[i - 1][j] === 1) {
                s++;
            }
            if (j - 1 >= 0) {
                if (this.state.data[i - 1][j - 1] === 1) {
                    s++;
                }
            }
            if (j + 1 < this.state.cols) {
                if (this.state.data[i - 1][j + 1] === 1) {
                    s++;
                }
            }
        }
        if (i + 1 < this.state.rows) {
            if (this.state.data[i + 1][j] === 1) {
                s++;
            }
            if (j - 1 >= 0) {
                if (this.state.data[i + 1][j - 1] === 1) {
                    s++;
                }
            }
            if (j + 1 < this.state.cols) {
                if (this.state.data[i + 1][j + 1] === 1) {
                    s++;
                }
            }
        }
        if (j - 1 >= 0) {
            if (this.state.data[i][j - 1] === 1) {
                s++;
            }
        }
        if (j + 1 < this.state.cols) {
            if (this.state.data[i][j + 1] === 1) {
                s++;
            }
        }
        return s;
    }

    render() {
        return (
            <div className="App">
                <h1>Game of life</h1>
                <table>
                <tbody>
                {
                    this.state.data.map((e, i) => {
                        return (
                            <tr key={i}>
                            {
                                e.map((f, j) => {
                                    return (
                                        <td key={i + '' + j}
                                            onClick={(e) => this.onClick(i, j)}
                                            className={this.state.data[i][j] === 1 ? "cellSelected" : ""}>
                                        </td>
                                    )
                                })
                            }
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
                <div>Count: {this.state.count}</div>
                <button onClick={() => this.setState({
                    interval: this.run(),
                    count: 0
                })}>Start</button>
                <button onClick={() => {
                    clearInterval(this.state.interval);
                    this.setState({
                        interval: null
                    });
                }}>Stop</button>
                <div>{"Size: "}
                    <button onClick={() => {
                        clearInterval(this.state.interval);
                        this.reRender(15, 15);
                    }}>15 x 15</button>
                    <button onClick={() => {
                        clearInterval(this.state.interval);
                        this.reRender(20, 20);
                    }}>20 x 20</button>
                    <button onClick={() => {
                        clearInterval(this.state.interval);
                        this.reRender(30, 30);
                    }}>30 x 30</button>
                </div>
                <div>
                    {"Speed: "}
                    <button onClick={() => {
                        clearInterval(this.state.interval);
                        if (this.state.speed > 1) {
                            this.setState({
                                speed: this.state.speed -1
                            });
                            if (this.state.interval) {
                                clearInterval(this.state.interval);
                                this.setState({
                                    interval: this.run()
                                })
                            }
                        }
                    }}>-</button>
                    {this.state.speed}
                    <button onClick={() => {
                        if (this.state.speed < 10) {
                            this.setState({
                                speed: this.state.speed + 1
                            })
                            if (this.state.interval) {
                                clearInterval(this.state.interval);
                                this.setState({
                                    interval: this.run()
                                })
                            }
                        }
                    }}>+</button>
                </div>
                <a href="https://github.com/kienhg96/fcc-game-of-life">Github</a>
            </div>
        );
    }
}

export default App;
