const { fetchJson } = require('../utils/fetcher')

/**
 * Get text from JSON
 *
 * @param {String} kata
 */

const font = (kata) => new Promise((resolve, reject) => {
    fetchJson('https://api.terhambar.com/bpk?kata=' + kata)
        .then((result) =>  resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {
    font
}
