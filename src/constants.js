/* constants.js is used to manage the endpoint of our project */

let DEBUG = true
let host = "http://127.0.0.1:8000"
let stripePublishKey = "";

if (!DEBUG) {
    host = "https://domain.com"
    stripePublishKey = "pk_test_MipcN5hmhAUD39m6gsC8QB6h001DTO0Ajv"
}

/* TEMPORARY, USED FOR TESTING SINCE DEBUG IS TRUE */
stripePublishKey = "pk_test_MipcN5hmhAUD39m6gsC8QB6h001DTO0Ajv"
export { stripePublishKey };

export const APIEndpoint = `${host}/api`

export const fileUploadURL = `${APIEndpoint}/demo/`
export const facialRecognitionURL = `${APIEndpoint}/upload/`
export const changeEmailURL = `${APIEndpoint}/change-email/`
export const emailURL = `${APIEndpoint}/email/`
export const changePasswordURL = `${APIEndpoint}/change-password/`
export const billingURL = `${APIEndpoint}/billing/`
export const subscribeURL = `${APIEndpoint}/subscribe/`
export const APIkeyURL = `${APIEndpoint}/api-key/`
export const cancelSubscriptionURL = `${APIEndpoint}/cancel-subscription/`