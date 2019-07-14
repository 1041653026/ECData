/**
 * common api about proxy
 */
import request from '../utils/request'

let Api_Domain = process.env.NODE_ENV === 'production' ? location.origin : 'http://192.168.1.111:3030/api/';

function commonGet (data) {
  return request({
    url: `${Api_Domain}${data.url}`,
    method: 'get',
    params: data.params
  })
}

function commonPost (data) {
  return request({
    url: `${Api_Domain}${data.url}`,
    method: 'post',
    data: data.params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
function commonFile (data) {
  return request({
    url: `${Api_Domain}${data.url}`,
    method: 'post',
    data: data.params,
    headers: {
      'Content-Type': 'multiple/form-data'
    }
  })
}
export default {
    commonGet,
    commonPost,
    commonFile
}
