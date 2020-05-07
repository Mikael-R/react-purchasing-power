import api from './api-service'

export const getWages = () => api.get('/wages')
export const getCountries = () => api.get('/countries')
export const getBMI = (country) => api.get(`/bmi?country=${country}`)
export const getCountryInfo = (country) => api.get(`/country-info?country=${country}`)
