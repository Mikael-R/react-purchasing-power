import React, { useState, useEffect } from 'react'
import './App.css'
import Country from './component/country'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import LoadingScreen from 'react-loading-screen'
import * as apiService from './service/backend-api-service'
import { GiPodiumWinner, GiPodiumSecond, GiPodium } from 'react-icons/gi'

export default function App() {

  const firstIcon = <GiPodiumWinner size={'5em'} className="text-success"/>
  const secondIcon = <GiPodiumSecond size={'5em'} className="text-danger"/>
  const podiumIcon = <GiPodium size={'5em'} className="text-secondary"/>

  const [{ country1Icon, country2Icon }, setResult] = useState({
    country1Icon: podiumIcon,
    country2Icon: podiumIcon
  })

  const [countries, setCountries] = useState([])
  const [country1, setSelectedCountry1] = useState(null)
  const [country2, setSelectedCountry2] = useState(null)

  useEffect(() => {
    apiService.getCountries().then(
      countries => setCountries(countries.data),
      err => console.log(err)
    )
  }, [])

  useEffect(() => {
    console.log(country1)
    if (country1 && country2) {
      compareCountries()
    }
  }, [country1, country2])


  function onSelectCountry(country, elementName) {

    if (elementName === "Country1") {
      setSelectedCountry1(country)
    } else {
      setSelectedCountry2(country)
    }
  }

  function compareCountries() {

    const bigMacPrice1 = country1.bmi.dollar_price
    const bigMacPrice2 = country2.bmi.dollar_price

    const diff = bigMacPrice1 - bigMacPrice2

    if (diff > 0) {
      setResult({
        country1Icon: firstIcon,
        country2Icon: secondIcon,
      })
    } else if (diff < 0) {
      setResult({
        country1Icon: secondIcon,
        country2Icon: firstIcon,
      })
    } else {
      setResult({
        country1Icon: podiumIcon,
        country2Icon: podiumIcon
      })
    }
  }

  return (
    <Container>
      <LoadingScreen
        loading={countries.length === 0}
        bgColor='#f1f1f1'
        spinnerColor='#9ee5f8'
        textColor='#676767'
        text='Carregando dados...'
      >
        <Form>
          <Form.Row>
            <Col>
              <Card>
                <Card.Header> Dados do primeiro país </Card.Header>
                <Card.Body>
                  <Country
                    onCountrySelected={onSelectCountry}
                    countries={countries}
                    name="Country1"
                  />
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-center">
                    {country1Icon}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Dados do segundo país</Card.Header>
                <Card.Body>
                  <Country
                    onCountrySelected={onSelectCountry}
                    countries={countries}
                    name="Country2"
                  />
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-center">
                    {country2Icon}
                  </div>
                </Card.Footer>
              </Card >
            </Col>
          </Form.Row>
        </Form>
      </LoadingScreen>
    </Container>
  );
}