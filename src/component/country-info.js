import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import dateFormat from 'dateformat'
import CurrencyInput from 'react-currency-input'

export default function CountryInfo(props) {

    if (!props.countryInfo) {
        return null
    }

    const { bmi, symbol, minWage, date } = props.countryInfo

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <p className="mb-1"> Salário mínimo: {currency(minWage, symbol)} </p>
                <p className="mb-1"> <small className="text-muted"> Última coleta: {dateFormat(date, "dd/mm/yyyy")} </small> </p>
                <p className="mb-1"> <small className="text-muted"> Dados de salário são coletados em: <a href="https://pt.countryeconomy.com/mercado-laboral/salario-minimo-nacional"> Country Economy</a> </small> </p>

            </ListGroup.Item>
            <ListGroup.Item>
                Data da última coleta do BMI: {dateFormat(bmi.Date, "dd/mm/yyyy")}
                <p className="mb-1"> <small className="text-muted"> Dados coletados em: <a href="https://www.quandl.com/data/ECONOMIST-The-Economist-Big-Mac-Index"> Quandl </a> </small> </p>
            </ListGroup.Item>
            <ListGroup.Item>Valor do Big Mac no país: {currency(bmi.local_price, symbol)}</ListGroup.Item>
            <ListGroup.Item>Conversão da moeda em dollar: {currency(bmi.dollar_ex, "$")}</ListGroup.Item>
            <ListGroup.Item>Valor do Big Mac em dolar: {currency(bmi.dollar_price, "$")}</ListGroup.Item>
        </ListGroup>
    )
}

function currency(value, symbol) {
    return new CurrencyInput({
        value: value,
        decimalSeparator: ",",
        thousandSeparator: ".",
        prefix: `${symbol || ''} `,
        precision: 2
    }).getMaskedValue()
}