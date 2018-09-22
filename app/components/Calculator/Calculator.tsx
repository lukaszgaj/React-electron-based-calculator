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
        } else {
            switch (buttonName) {
                case 'C':
                    this.setState({
                        currentValue: null,
                        temp: null,
                        operation: null,
                    })
                    break;

                case 'V':
                    this.setState(DecimalBasedMathFunctions.countSqrt(this.state, buttonName));
                    break;

                case '%':
                    this.setState(DecimalBasedMathFunctions.countPercent(this.state, buttonName));
                    break;

                case '.':
                    this.setState(DecimalBasedMathFunctions.inputDot(this.state));
                    break;

                case '=':
                    this.setState(DecimalBasedMathFunctions.inputEquals(this.state, buttonName));
                    break;

                case '+/-':
                    this.setState(DecimalBasedMathFunctions.inputNegate(this.state));
                    break;

                default:
                    if (this.state.operation) {
                        this.setState({
                            currentValue: DecimalBasedMathFunctions.operate(this.state.currentValue, this.state.temp, this.state.operation),
                            temp: null,
                            operation: buttonName,
                        });
                    } else if (!this.state.temp) {
                        this.setState({operation: buttonName});
                    } else {
                        this.setState({
                            currentValue: this.state.temp,
                            temp: null,
                            operation: buttonName,
                        })
                    }
            }
            console.error(`Couldn\'t have handled this click, state: ${this.state}`);
        }
    }

    handleKey = (key: string) => {
        console.log(this.state);
        switch (key) {
            case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
                this.setState(DecimalBasedMathFunctions.inputDigit(this.state, key));
                break;

            case 'Delete': case 'c':
                this.setState({
                    currentValue: null,
                    temp: null,
                    operation: null,
                });
                break;

            case 'Backspace':
                if (!this.state.operation && this.state.temp) {
                    this.state.temp.length > 1 ?
                        this.setState({
                            temp: this.state.temp.slice(0, -1)
                        }) :
                        this.setState({
                            temp: null
                        })
                }
                break;

            case 'v':
                this.setState(DecimalBasedMathFunctions.countSqrt(this.state, 'V'));
                break;

            case '.':
                this.setState(DecimalBasedMathFunctions.inputDot(this.state));
                break;

            case '%':
                this.setState(DecimalBasedMathFunctions.countPercent(this.state, key));
                break;

            case 'Enter': case '=':
                this.setState(DecimalBasedMathFunctions.inputEquals(this.state, '='));
                break;

            default:
                if (key === '*') key = 'x';
                if (this.state.operation) {
                    this.setState({
                        currentValue: DecimalBasedMathFunctions.operate(this.state.currentValue, this.state.temp, this.state.operation),
                        temp: null,
                        operation: key,
                    });
                    break;
                } else if (!this.state.temp) {
                    this.setState({operation: key});
                    break;
                } else {
                    this.setState({
                        currentValue: this.state.temp,
                        temp: null,
                        operation: key,
                    })
                    break;
                }
                console.error('Unknown key, perfomed no action');
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
