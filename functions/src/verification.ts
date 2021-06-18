import {promisify} from "util";
import JwksClient from "jwks-rsa";
import * as functions from "firebase-functions";
import {Request} from "firebase-functions/lib/providers/https";
import {GetPublicKeyOrSecret, JwtHeader, SigningKeyCallback, verify, VerifyOptions} from "jsonwebtoken";
import {chatbotProjectId, chatIssuer, jwksUri} from "./config";

const issuer = chatIssuer;
const audience = chatbotProjectId;
const bearerPrefix = "Bearer ";

const jwksClient = JwksClient({jwksUri});
// eslint-disable-next-line @typescript-eslint/ban-types
const verifyPromise = promisify<string, GetPublicKeyOrSecret, VerifyOptions, object | undefined>(verify);

// @see https://developers.google.com/chat/how-tos/bots-develop
export async function verifyBearerToken(req: Request): Promise<boolean> {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader?.startsWith(bearerPrefix)) {
        return false;
    }
    const token = authorizationHeader?.substring(bearerPrefix.length);
    try {
        await verifyPromise(token, getKey, {
            audience,
            issuer,
        });
        return true;
    } catch (e) {
        functions.logger.error(`invalid bearer token: ${e}`);
        return false;
    }
}

function getKey(header: JwtHeader, callback: SigningKeyCallback): void {
    jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err);
        }
        const signingKey = ("publicKey" in key) ? key.publicKey : key.rsaPublicKey;
        callback(null, signingKey);
    });
}