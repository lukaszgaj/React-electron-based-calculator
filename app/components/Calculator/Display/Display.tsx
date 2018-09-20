import * as React from 'react';
const style = require('./Display.scss');

interface IProps {
    displayValue: any;
}

export class Display extends React.Component<IProps> {
    render() {
        return (
            <div className={style.display}>{this.props.displayValue}</div>
        );
    };
}
