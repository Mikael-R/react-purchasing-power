import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import dateFormat from 'dateformat'
import CurrencyInput from 'react-currency-input'

export default function CountryInfo(props) {

    if (!props.countryInfo) {
        return null
    }

    const { data, symbol } = props.countryInfo

    const items = data.filter((value, i) => i < 4).map((value, i) => {
        const info = infoMapper[i];
        return (<ListGroup.Item> {info.label} : {info.format(value, symbol)} </ListGroup.Item>)
    });

    return (
        <ListGroup variant="flush">
            {items}
        </ListGroup>
    )

}

const infoMapper = [{
    label: "Última data da coleta",
    format: (value) => dateFormat(value, "dd/mm/yyyy")
}, {
    label: "Valor do Big Mac no país",
    format: (value, symbol) => new CurrencyInput({
        value: value,
        decimalSeparator: ",",
        thousandSeparator: ".",
        prefix: `${symbol || ''} `,
        precision: 2
    }).getMaskedValue()
}, {
    label: "Conversão da moeda em dollar",
    format: (value, symbol) => new CurrencyInput({
        value: value,
        decimalSeparator: ",",
        thousandSeparator: ".",
        prefix: `$ `,
        precision: 2
    }).getMaskedValue()
}, {
    label: "Valor do Big Mac em dolar",
    format: (value, symbol) => new CurrencyInput({
        value: value,
        decimalSeparator: ",",
        thousandSeparator: ".",
        prefix: `$ `,
        precision: 2
    }).getMaskedValue()
}]