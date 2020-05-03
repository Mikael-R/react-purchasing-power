import React from 'react'
import Select from 'react-select'
import CurrencyInput from 'react-currency-input'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'

export default class Country extends React.Component {

    constructor(props) {
        super(props)

        this.countries = this.props.countries.map((el, index) => {
            return {
                ...el,
                value: index,
                label: el.country
            }
        })

        this.selectedCountry = this.countries.filter(c => c.label === this.props.selectedCountry.country)[0]
        this.state = { selectedCountry: this.selectedCountry }
    }

    handleInputChange = (e, maskedValue, floatValue) => {
        this.setState({ price: floatValue })
        this.props.onPriceChange(floatValue, this.props.name)
    }

    handleSelect = (country) => {
        this.setState({ selectedCountry: country })
        this.props.onCountrySelected(country, this.props.name)
    }

    render() {

        const { selectedCountry, price } = this.state
        const { symbol, minWage } = selectedCountry

        return (

            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>País</Form.Label>
                    <Select
                        options={this.countries}
                        value={selectedCountry}
                        onChange={this.handleSelect}>
                    </Select>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Salário mínimo</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>{symbol}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <CurrencyInput
                            decimalSeparator=","
                            thousandSeparator="."
                            value={minWage}
                            className="form-control"
                            readOnly />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Preço do Big Mac</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>{symbol}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <CurrencyInput
                            decimalSeparator=","
                            thousandSeparator="."
                            value={price}
                            className="form-control"
                            onChangeEvent={this.handleInputChange}
                        />
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        )
    }
}