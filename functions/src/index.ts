import * as functions from "firebase-functions";
import {region} from "./config";
import {verifyBearerToken} from "./verification";
import {chat_v1} from "googleapis/build/src/apis/chat/v1";

export const googleChatBot = functions.region(region).https.onRequest(async (req, res): Promise<void> => {
    const tokenVerified = await verifyBearerToken(req);
    if (!tokenVerified) {
        res.sendStatus(401);
        return;
    }
    const body = req.body as chat_v1.Schema$DeprecatedEvent;
    functions.logger.log(JSON.stringify(body));
    const reply: chat_v1.Schema$Message = {
        text: "Hello from Firebase!",
    };
    res.send(reply);
});
