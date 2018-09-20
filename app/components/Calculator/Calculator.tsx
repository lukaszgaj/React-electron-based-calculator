import * as React from 'react';
import {ButtonsContainer} from './ButtonsContainer/ButtonsContainer';
import {Display} from './Display/Display';
import * as DecimalBasedMathFunctions from '../../math/mathFunctions';
const style = require('./Calculator.scss');

interface IProps {
}

interface IState {
    currentValue: any,
    temp: any,
    operation: any
}

export class Calculator extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentValue: null,
            temp: null,
            operation: null,
        }
    }

    handleClick = (buttonName: string, isOperator: boolean) => {
        if (!isOperator) {
            this.setState(DecimalBasedMathFunctions.inputDigit(this.state, buttonName));
        } else if (buttonName === 'C') {
            this.setState({
                currentValue: null,
                temp: null,
                operation: null,
            })
        } else if (buttonName === 'V') {
            this.setState(DecimalBasedMathFunctions.countSqrt(this.state, buttonName));
        } else if (buttonName === "%") {
            this.setState(DecimalBasedMathFunctions.countPercent(this.state, buttonName));
        } else if (buttonName === '.') {
            this.setState(DecimalBasedMathFunctions.inputDot(this.state));
        } else if (buttonName === '=') {
            this.setState(DecimalBasedMathFunctions.inputEquals(this.state, buttonName));
        } else if (buttonName === '+/-') {
            this.setState(DecimalBasedMathFunctions.inputNegate(this.state));
        } else if (this.state.operation) {
            this.setState({
                currentValue: DecimalBasedMathFunctions.operate(this.state.currentValue, this.state.temp, this.state.operation),
                temp: null,
                operation: buttonName,
            });
        } else if (!this.state.temp) {
            this.setState({ operation: buttonName });
        } else {
            this.setState({
                currentValue: this.state.temp,
                temp: null,
                operation: buttonName,
            })
        }

        return new Error(`Couldn\'t have handled this click, state: ${this.state}`);
    }

    handleKey = (key: string) => {
        if (key === 'Delete' || key === 'Backspace') {
            this.setState({
                currentValue: null,
                temp: null,
                operation: null,
            })
        } else if (/[0-9]/.test(key)) {
            this.setState(DecimalBasedMathFunctions.inputDigit(this.state, key));
        } else if (key === '.') {
            this.setState(DecimalBasedMathFunctions.inputDot(this.state));
        }
    }

    render() {
        return (
            <div className={style.calculator}>
                <Display displayValue={this.state.temp ? this.state.temp :
                    this.state.currentValue ? this.state.currentValue : '0'}>
                </Display>
                <ButtonsContainer clickHandler={this.handleClick} keyHandler={this.handleKey}></ButtonsContainer>
            </div>
        );
    };
}
