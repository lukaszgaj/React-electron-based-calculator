import * as React from 'react';
import {Button} from './Button/Button';
const style = require('./ButtonsContainer.scss');

interface IProps {
    clickHandler: any;
    keyHandler: any;
}

export class ButtonsContainer extends React.Component<IProps> {
    private handleClick = (buttonName: string, isOperator: boolean) => {
        this.props.clickHandler(buttonName, isOperator);
    }

    private handleKey = (e: KeyboardEvent) => {
        if (/\*|[0-9]|\+|-|\/|x|=|%|c|v|\.|Delete|Backspace|Enter/.test(e.key) && !/F\d|NumLock|CapsLock|ContextMenu/.test(e.key)) this.props.keyHandler(e.key);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKey, false);
    }

    render() {
        return (
            <div className={style.buttonsContainer}>
                <div className={style.row}>
                    <Button name="C" clickHandler={this.handleClick} isOperator={true}></Button>
                    <Button name="V" clickHandler={this.handleClick} isOperator={true}></Button>
                    <Button name="%" clickHandler={this.handleClick} isOperator={true}></Button>
                    <Button name="/" clickHandler={this.handleClick} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="7" clickHandler={this.handleClick}></Button>
                    <Button name="8" clickHandler={this.handleClick}></Button>
                    <Button name="9" clickHandler={this.handleClick}></Button>
                    <Button name="x" clickHandler={this.handleClick} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="4" clickHandler={this.handleClick}></Button>
                    <Button name="5" clickHandler={this.handleClick}></Button>
                    <Button name="6" clickHandler={this.handleClick}></Button>
                    <Button name="+" clickHandler={this.handleClick} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="1" clickHandler={this.handleClick}></Button>
                    <Button name="2" clickHandler={this.handleClick}></Button>
                    <Button name="3" clickHandler={this.handleClick}></Button>
                    <Button name="-" clickHandler={this.handleClick} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="+/-" clickHandler={this.handleClick} isOperator={true}></Button>
                    <Button name="0" clickHandler={this.handleClick}></Button>
                    <Button name="." clickHandler={this.handleClick} isOperator={true}></Button>
                    <Button name="=" clickHandler={this.handleClick} isOperator={true}></Button>
                </div>
            </div>
        );
    };
}
