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

            props.onCountrySelected(info.data, props.name)
        }).catch(err => {

            setLoading(false)
            console.log(err)
        })
    }

    return (
        <>
            <Form.Group>
                <Select
                    options={countries}
                    onChange={handleSelect} 
                    placeholder={"Selecione um país..."}/>
            </Form.Group>

            {isLoading ? <Loading /> : <CountryInfo countryInfo={countryInfo} />}
        </>
    )

}