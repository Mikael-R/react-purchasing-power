import api from './api-service'

const apiScrap = {
    getWages: () => api.get('/load')
}

export default apiScrap