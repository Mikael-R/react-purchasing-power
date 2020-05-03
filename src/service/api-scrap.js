import api from './api-service'

const apiScrap = {
    getWages: () => api.get('/')
}

export default apiScrap