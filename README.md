# Google Chat Bot with Firebase and Node and secured with Google-Token-Verification

Bootstrap code for a Google Chat Bot with an endpoint implementation in Firebase functions.

# Start your own Chat Bot

1. Create a Firebase project and edit `.firebaserc` to change the default project to your Firebase project.
1. Go to your Google Project and enable the [Google Chat API](https://console.cloud.google.com/marketplace/product/google/chat.googleapis.com).
1. Edit `src/config.ts` and update it to your needs: Insert the `chatbotProjectId` of your Google Project.
1. Deploy you project for the first time and copy the endpoint URL of the Firebase function.
1. Go back to your Google Project and manage the [Google Chat API](https://console.cloud.google.com/marketplace/product/google/chat.googleapis.com).
1. Go to "Configure" and insert name, avatar (as dummy you can use https://goo.gl/yKKjbw), and description. Choose if it should repond to direct messages or
   room mentions. Choose the "bot url" with the Firebase function's endpoint url that you just deployed. And at last restrict the access to certain users or the
   whole organisation.

Congratulations! You have a Chat Bot! In Google Chat search for your chat bot's name and test it out.

# Verification of bot authenticity

This is an important part. Because Firebase endpoints are public and there is no authentication mechanics to Firebase auth, it is necessary to filter
out bad requests. Google sends a JSON-Web-Token (JWT) with each message to the endpoint which must be verified to ensure that the request comes from Google
Chat. Verification of bot authenticity is made as described in the docs: https://developers.google.com/chat/how-tos/bots-develop#verifying_bot_authenticity.
Look into it for necessary changes in `config.ts` to `chatIssuer` and the `jwksUri`. [Jwks](https://auth0.com/docs/tokens/json-web-tokens/json-web-key-sets) is
just another kind of keychain instead of [x509](https://en.wikipedia.org/wiki/X.509) and both provided by
Google: https://www.googleapis.com/service_accounts/v1/metadata/x509/chat@system.gserviceaccount.com
, https://www.googleapis.com/service_accounts/v1/metadata/jwk/chat@system.gserviceaccount.com, where `chat@system.gserviceaccount.com` is the issuer.
