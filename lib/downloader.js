/* eslint-disable prefer-promise-reject-errors */
const { fetchJson } = require('../utils/fetcher')
const { promisify } = require('util')
const { twitter } = require('video-url-link')
const { getVideoMeta } = require('tiktok-scraper')

const twtGetInfo = promisify(twitter.getInfo)

const tweet = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    twtGetInfo(url, {})
        .then((content) => resolve(content))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const insta = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    fetchJson('https://villahollanda.com/api.php?url=' + url)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const tiktok = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    getVideoMeta(url, { noWaterMark: true, hdVideo: true })
        .then(async (result) => {
            console.log('Get video from', '@' + result.authorMeta.name, 'ID:', result.id)
            if (result.videoUrlNoWaterMark) {
                result.url = result.videoUrlNoWaterMark
                result.NoWaterMark = true
            } else {
                result.url = result.videoUrl
                result.NoWaterMark = false
            }
            resolve(result)
        })
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const facebook = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    const apikey = '3tgDBIOPAPl62b0zuaWNYog2wvRrc4V414AjMi5zdHbU4a'
    fetchJson('http://keepsaveit.com/api/?api_key=' + apikey + '&url=' + url, { method: 'GET' })
        .then((result) => {
            const key = result.code
            switch (key) {
            case 212:
                return reject('Access blocked, you have reached maximum 5 limit per-minute hits, please stop extra hits.')
            case 101:
                return reject('API key error: Your access key is wrong.')
            case 102:
                return reject('Your account is not activated.')
            case 103:
                return reject('Your account is suspend for some resons.')
            case 104:
                return reject('API key error: You have not set your api_key in parameters.')
            case 111:
                return reject('Full access is not allow with DEMO API key.')
            case 112:
                return reject('Sorry, something wrong, or an invalid link. Please try again or check your link.')
            case 113:
                return reject('Sorry this website is not supported.')
            case 404:
                return reject('The link you followed may be broken, or the page may have been removed.')
            case 405:
                return reject('You can\'t download media in private profile. Looks like the video you want to download is private and it is not accessible from our server.')
            default:
                return resolve(result)
            }
        })
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const ytmp3 = (url) => new Promise((resolve, rejects) => {
    console.log('Get metadata from =>', url)
    fetchJson('https://mhankbarbar.herokuapp.com/api/yta?url=' + url)
        .then((result) => resolve(result))
        .catch((err) => {
            console.log(err)
            rejects(err)
        })
})

const ytmp4 = (url) => new Promise((resolve, rejects) => {
    console.log('Get metadata from =>', url)
    fetchJson('https://mhankbarbar.herokuapp.com/api/ytv?url=' + url)
        .then((result) => resolve(result))
        .then((err) => {
            console.log(err)
            rejects(err)
        })
})

module.exports = {
    tweet,
    tiktok,
    insta,
    facebook,
    ytmp3,
    ytmp4
}
