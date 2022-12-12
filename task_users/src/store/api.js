export const api = {
    get(url, data) {
      return fetch(`http://localhost:8888${url}`, {
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json',
        // },
        // credentials: 'include',
      })
        .then(res => {
          const { status, ok } = res
          return res.json()
            .then(r => ({ ...r, ok, status }))
            .catch(err => ({ err, status }))
        })
        .catch(err => err)
    },
    post(url, data) {
      return fetch(
        `http://localhost:8888${url}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          // credentials: 'include',
        }
      )
        .then(res => {
	        console.log(res,'resreseerere')
	        // тут приходит
          const { status, ok } = res;

          return res.text().then((text) => {
			  // debugger
	          if (typeof text==="string") {
				  return {ok, status, text}
	          }
            return {
              // ...(text ? JSON.parse(text) : {}),
              ...(text ? JSON.parse(text) : {}),
              ok,
              status,
            }
          }).catch(err => ({ err, status }))
        })
        .catch(err => err)
    },
}
