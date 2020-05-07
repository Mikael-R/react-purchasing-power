import React, { useState } from 'react'
import Select from 'react-select'
import CurrencyInput from 'react-currency-input'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import CountryInfo from './country-info'
import * as apiService from '../service/backend-api-service'
import Loading from './loading'

export default function Country(props) {

    const [isLoading, setLoading] = useState(false)
    const [countryInfo, setCountryInfo] = useState(null)

    const countries = props.countries.map((el, index) => {
        return {
            value: el.abbrev,
            label: el.name
        }
    })

    function handleSelect(country) {

        setLoading(true)
        apiService.getCountryInfo(country.value).then(info => {

            setLoading(false)
            setCountryInfo(info.data)

            props.onCountrySelected(country.label, info.data, props.name)
        }).catch(err => {

            setLoading(false)
            console.log(err)
        })
    }

    return (
        <>
            <Form.Group>
                <Form.Label>País</Form.Label>
                <Select
                    options={countries}
                    onChange={(e, maskedValue, floatValue) => handleSelect(e, maskedValue, floatValue)}>
                </Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Salário mínimo</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text></InputGroup.Text>
                    </InputGroup.Prepend>
                    <CurrencyInput
                        decimalSeparator=","
                        thousandSeparator="."
                        className="form-control"
                        value={countryInfo ? countryInfo.minWage : 0}
                        prefix={countryInfo ? countryInfo.symbol : ''}
                        readOnly />
                </InputGroup>
            </Form.Group>

            {isLoading ? <Loading /> : <CountryInfo countryInfo={countryInfo} />}
        </>
    )

}