import {Decimal} from 'decimal.js';

export const inputDigit = (obj: any, buttonName: string) => {
    if (buttonName === '0' && obj.temp === '0') {
        return obj;
    }

    if (buttonName !== '0' && obj.temp === '0') {
        return {temp: buttonName}
    }

    if (obj.operation === 'V' || obj.operation === '%' || obj.operation === '=') {
        return {
            currentValue: null,
            temp: buttonName,
            operation: null
        }
    }

    if (obj.operation) {
        if (obj.temp) {
            return {temp: obj.temp + buttonName};
        }
        return {temp: buttonName};
    }

    if (obj.temp) {
        return {
            temp: obj.temp + buttonName,
            currentValue: null,
        };
    }

    return {
        temp: buttonName,
        currentValue: null,
    };
}

export const mathOperation = (numberOne: string, numberTwo: string, operation: string) => {
    if (operation === '%') {
        return numberTwo ? numberTwo : numberOne;
    }
    if (operation === 'V' || operation === '=') {
        return numberOne ? numberOne : numberTwo;
    }

    if (operation === '+') {
        let one = new Decimal(numberOne || '0');
        let two = new Decimal(numberTwo || '0');
        return one.plus(two).toString();
    }
    if (operation === '-') {
        let one = new Decimal(numberOne || '0');
        let two = new Decimal(numberTwo || '0');
        return one.minus(two).toString();
    }
    if (operation === 'x') {
        let one = new Decimal(numberOne || '1');
        let two = new Decimal(numberTwo || '1');
        return one.times(two).toString();
    }
    if (operation === '/') {
        let one = new Decimal(numberOne || '1');
        let two = new Decimal(numberTwo || '1');
        return one.div(two).toString();
    }
    throw Error(`Unknown operation '${operation}'`);
}

export const countSqrt = (obj: any, buttonName: string) => {
    if (obj.temp) {
        return {
            temp: new Decimal(obj.temp)
                .squareRoot()
                .toString(),
            operation: buttonName
        };
    }
    if (obj.currentValue) {
        return {
            currentValue: new Decimal(obj.currentValue)
                .squareRoot()
                .toString(),
            operation: buttonName
        };
    }
    return obj;
}

export const countPercent = (obj: any, buttonName: string) => {
    if (obj.operation && obj.temp) {
        let result = mathOperation(obj.currentValue, obj.temp, obj.operation);
        if (!obj.currentValue) {
            result = mathOperation(obj.temp, obj.temp, obj.operation);
        }
        return {
            currentValue: new Decimal(result)
                .div(new Decimal('100'))
                .toString(),
            temp: null,
            operation: buttonName,
        };
    }
    if (obj.operation && obj.currentValue) {
        let result = mathOperation(obj.currentValue, obj.temp, obj.operation);
        if (!obj.temp && obj.operation === 'x') {
            result = new Decimal(result).times(new Decimal(result)).toString();
            return {
                currentValue: new Decimal(result)
                    .div(new Decimal('100'))
                    .toString(),
                operation: null
            };
        } else if (!obj.temp && obj.operation === '/') {
            result = new Decimal(result).times(new Decimal(result)).toString();
            return {
                currentValue: new Decimal(obj.currentValue)
                    .div(new Decimal(result))
                    .toString(),
                operation: null
            };
        } else if (!obj.temp && (obj.operation === '+' || obj.operation === '-')) {
            result = new Decimal(result).times(new Decimal(result)).div(new Decimal('100')).plus(new Decimal(obj.currentValue)).toString();
            return {
                currentValue: new Decimal(result)
                    .toString(),
                operation: null
            };
        }
    }
    if (obj.temp) {
        return {
            temp: new Decimal(obj.temp)
                .div(new Decimal('100'))
                .toString(),
            operation: buttonName
        };
    }
    if (obj.operation === '%') {
        return {
            currentValue: new Decimal(obj.currentValue)
                .div(new Decimal('100'))
                .toString(),
            operation: buttonName
        };
    }
    if (obj.currentValue) {
        return {
            currentValue: new Decimal(obj.currentValue)
                .div(new Decimal('100'))
                .toString(),
            operation: null
        };
    }
    return obj;
}

export const inputDot = (obj: any) => {
    if (obj.temp) {
        if (obj.temp.includes('.')) {
            return obj;
        }
        return {temp: obj.temp + '.'};
    }
    return {temp: '0.'};
}

export const equal = (obj: any, buttonName: string) => {
    if (obj.temp && obj.operation && obj.operation !== '=') {
        return {
            currentValue: mathOperation(obj.currentValue, obj.temp, obj.operation),
            temp: null,
            operation: buttonName,
        };
    } else if (obj.currentValue && obj.operation && obj.operation !== '=') {
        return {
            currentValue: mathOperation(obj.currentValue, obj.temp, obj.operation),
            temp: null,
            operation: buttonName,
        };
    } else {
        return obj
    }
}

export const negate = (obj: any) => {
    if (obj.temp) {
        return {temp: (-1 * parseFloat(obj.temp)).toString()};
    }
    if (obj.currentValue) {
        return {currentValue: (-1 * parseFloat(obj.currentValue)).toString()};
    }
    return obj;
}
