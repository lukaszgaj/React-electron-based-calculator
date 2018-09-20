import * as React from 'react';
const style = require('./Button.scss');

interface IProps {
    name: string;
    isOperator?: boolean;
    clickHandler: any;
    keyHandler: any;
}

export class Button extends React.Component<IProps> {
    private handleClick = () => {
        this.props.clickHandler(this.props.name, this.props.isOperator);
    };

    private handleKey = (e: any) => {
        this.props.keyHandler(e.key);
    }

    render() {
        if (this.props.name === 'C') return <button className={[style.button, style.clear].join(' ')} onKeyDown={this.handleKey} onClick={this.handleClick}>{this.props.name}</button>
        return (
            <button className={[style.button, this.props.isOperator ? style.operator : null].join(' ')} onKeyDown={this.handleKey} onClick={this.handleClick}>{this.props.name}</button>
        );
    };
}
