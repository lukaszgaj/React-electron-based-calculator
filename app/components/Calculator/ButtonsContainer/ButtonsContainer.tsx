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

    private handleKey = (buttonName: string) => {
        this.props.keyHandler(buttonName);
    }


    render() {
        return (
            <div className={style.buttonsContainer}>
                <div className={style.row}>
                    <Button name="C" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                    <Button name="V" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                    <Button name="%" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                    <Button name="/" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="7" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="8" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="9" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="x" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="4" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="5" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="6" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="+" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="1" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="2" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="3" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="-" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                </div>
                <div className={style.row}>
                    <Button name="+/-" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                    <Button name="0" clickHandler={this.handleClick} keyHandler={this.handleKey}></Button>
                    <Button name="." clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                    <Button name="=" clickHandler={this.handleClick} keyHandler={this.handleKey} isOperator={true}></Button>
                </div>
            </div>
        );
    };
}
