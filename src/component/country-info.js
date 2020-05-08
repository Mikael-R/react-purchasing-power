import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import dateFormat from 'dateformat'
import { format } from '../util/number-format-util'

export default function CountryInfo(props) {

    if (!props.countryInfo) {
        return null
    }

    const { bmi, symbol, minWage, date } = props.countryInfo

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h5 className="mb-1">Big Mac Index</h5>
                <p className="mb-1">
                    <small>Data da última coleta do BMI: {dateFormat(bmi.Date, "dd/mm/yyyy")} </small>
                    <br /><small className="text-muted"> Dados coletados em: <a href="https://www.quandl.com/data/ECONOMIST-The-Economist-Big-Mac-Index"> Quandl </a> </small>
                </p>
            </ListGroup.Item>
            <ListGroup.Item>Valor do Big Mac no país: {format(bmi.local_price, symbol)}</ListGroup.Item>
            <ListGroup.Item>Conversão da moeda em dollar: {format(bmi.dollar_ex, "$")}</ListGroup.Item>
            <ListGroup.Item>Valor do Big Mac em dolar: {format(bmi.dollar_price, "$")}</ListGroup.Item>

            <ListGroup.Item>
                <h5 className="mb-1"> Salário mínimo: {format(minWage, symbol)} </h5>
                <p className="mb-1">
                    <small className="text-muted"> Última coleta: {dateFormat(date, "dd/mm/yyyy")} </small>
                    <br /> <small className="text-muted"> Dados de salário são coletados em: <a href="https://pt.countryeconomy.com/mercado-laboral/salario-minimo-nacional"> Country Economy</a> </small>
                </p>

            </ListGroup.Item>
        </ListGroup>
    )
}