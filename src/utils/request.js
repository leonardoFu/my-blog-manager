let request = {
  resolveParams(paramObj){
    let paramArr = [];
    Object.keys(paramObj).forEach((key) => {
      paramArr.push(`${key}=${paramObj[key]}`);
    })
    if (paramArr.length) {
      return paramArr.join('&');
    } else {
      return;
    }
  },
  crossDomain(requestObj){
    return Object.assign({}, requestObj, {
      mode: 'cors',
      credentials: 'include'
    });
  },
  get(url, param = {}){
    if(url.includes('?')){
      url += this.resolveParams(param) ? `&${this.resolveParams(param)}` : '';
    }
    url += this.resolveParams(param) ?  `?${this.resolveParams(param)}` : '';
    let option = {
      method: 'GET'
    }

    return fetch(url, this.crossDomain(option));
  },
  post(url, data){
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: this.resolveParams(data)
    }
    return fetch(url, this.crossDomain(option));
  },
  postJSON(url, data){
    let option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return fetch(url, this.crossDomain(option));
  },
  delJSON(url, data){
    let option = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return fetch(url, this.crossDomain(option));
  }
}
export default request;
