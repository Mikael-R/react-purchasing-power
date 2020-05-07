import React from 'react'
import './App.css'
import Country from './component/country'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import LoadingScreen from 'react-loading-screen'
import * as apiService from './service/backend-api-service'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      result: '',
      countries: []
    }
  }

  componentDidMount = () => {

    apiService.getCountries().then(countries => {
      this.setState({ countries: countries.data })
    }, err => console.log(err))

  }

  onSelectCountry = (countryName, country, elementName) => {

    console.log(country)
    if (elementName === "Country1") {
      this.setState({ countryName1: countryName, country1: country })
    } else {
      this.setState({ countryName2: countryName, country2: country })
    }

    if (this.state.country1 && this.state.country2) {
      this.compareCountries()
    } else {
      this.setState({ result: '' })
    }
  }

  compareCountries = () => {

    const { country1, country2, countryName1, countryName2 } = this.state


    const bigMacPrice1 = country1.data[3]
    const bigMacPrice2 = country2.data[3]

    const diff = bigMacPrice1 - bigMacPrice2

    let result = ''

    if (diff !== 0) {
      result = `O poder de compra do país ${parseFloat(diff) >= 0 ? countryName1 : countryName2} é maior`
    } else {
      result = `O poder de compra dos países são iguais`
    }

    this.setState({ result })
  }

  getResultLabel = (powerfull, powerfullCount, powerless, powerlessCount) =>
    `No(a) ${powerfull.country} da para comprar até ${powerfullCount.toFixed(0)} Big Mac's, e no(a) ${powerless.country} da para comprar até ${powerlessCount.toFixed(0)}, portanto, o poder de comprar do(a) ${powerfull.country} é maior`;

  render() {

    if (this.state.countries.length === 0)
      return (
        <LoadingScreen
          loading={true}
          bgColor='#f1f1f1'
          spinnerColor='#9ee5f8'
          textColor='#676767'
          text='Carregando salários mínimos dos países...'
        />
      )

    return (

      <Container>
        <Form>
          <Form.Row>
            <Col>
              <Card>
                <Card.Header>Dados do primeiro país</Card.Header>
                <Card.Body>
                  <Country
                    onPriceChange={this.onChangePrice}
                    onCountrySelected={this.onSelectCountry}
                    countries={this.state.countries}
                    name="Country1"
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Dados do segundo país</Card.Header>
                <Card.Body>
                  <Country
                    onPriceChange={this.onChangePrice}
                    onCountrySelected={this.onSelectCountry}
                    countries={this.state.countries}
                    name="Country2"
                  />

                </Card.Body>
              </Card >
            </Col>
          </Form.Row>

          <div className="d-flex justify-content-center">
            <label id="result">{this.state.result}</label>
          </div>

        </Form>
      </Container>
    );
  }
}