import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get (params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(params.url)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  private adapt (axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
