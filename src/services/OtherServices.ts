  export async function postForPrint(url = '', method = 'POST', data = {}) {
    // Esta peticion debe llevar toda la url por parametros
        try {
          await fetch(`${url}`, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
        } catch (error) {
          console.error(error)
        }
    }
  