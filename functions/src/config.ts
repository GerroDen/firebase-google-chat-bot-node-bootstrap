// Deployment region for functions
export const region = "europe-west3";
// Bearer Tokens received by bots will always specify this issuer.
export const chatIssuer = "chat@system.gserviceaccount.com";
// Url to obtain the public jwks for the issuer.
export const jwksUri = `https://www.googleapis.com/service_accounts/v1/metadata/jwk/${chatIssuer}`;
// Intended audience of the token, which will be the project number of the bot.
export const chatbotProjectId = "123456789";
