import React from 'react'
import './App.css'
import Country from './component/country'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import LoadingScreen from 'react-loading-screen'
import apiScrap from './service/api-scrap'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      price1: 1,
      price2: 1,
      result: '',
      countries: []
    }
  }

  componentDidMount = () => {

    apiScrap.getWages().then(response => {
      this.setState({
        countries: response.data,
        country1: response.data[0],
        country2: response.data[1]
      })
    }, err => console.log(err))

  }

  onSelectCountry = (country, elementName) => {
    if (elementName === "Country1") {
      this.setState({ country1: country })
    } else {
      this.setState({ country2: country })
    }
  }


  onChangePrice = (value, elementName) => {
    if (elementName === "Country1") {
      this.setState({ price1: parseFloat(value) })
    } else {
      this.setState({ price2: parseFloat(value) })
    }
  }

  handleCalcular = () => {

    const { country1, price1, country2, price2 } = this.state

    const countBigMac1 = country1.minWage / price1
    const countBigMac2 = country2.minWage / price2

    const diff = countBigMac1 - countBigMac2;

    let result = {}

    if (diff > 0) {
      result = this.getResultLabel(country1, countBigMac1, country2, countBigMac2)
    } else if (diff < 0) {
      result = this.getResultLabel(country2, countBigMac2, country1, countBigMac1)
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
          <Card>
            <Card.Header>Dados do primeiro país</Card.Header>
            <Card.Body>
              <Country
                onPriceChange={this.onChangePrice}
                onCountrySelected={this.onSelectCountry}
                countries={this.state.countries}
                selectedCountry={this.state.country1}
                name="Country1"
              />
            </Card.Body>
          </Card>

          <br />

          <Card>
            <Card.Header>Dados do segundo país</Card.Header>
            <Card.Body>
              <Country
                onPriceChange={this.onChangePrice}
                onCountrySelected={this.onSelectCountry}
                countries={this.state.countries}
                selectedCountry={this.state.country2}
                name="Country2"
              />

            </Card.Body>
          </Card >

          <br />

          <div className="d-flex justify-content-center">
            <input className="btn btn-success" type="button" value="Calcular" onClick={this.handleCalcular} />
          </div>

          <br />

          <div className="d-flex justify-content-center">
            <label id="result">{this.state.result}</label>
          </div>
        </Form>
      </Container>
    );
  }
}