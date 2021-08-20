import uuid from "uuid/dist/v1";
import md5 from "md5";
import { connectDB } from "./connect-db";
import { AUTHENTICATED } from "./../app/store/mutation";

const authenticationTokens = [];

async function assembleYserState(user) {
  let db = await connectDB();

  let tasks = await db
    .collection(`tasks`)
    .findOne({ owner: user.id })
    .toArray();
  let groups = await db
    .collection(`groups`)
    .findOne({ owner: user.id })
    .toArray();

  return {
    tasks,
    groups,
    session: { authenticated: `AUTHENTICATED`, id: user.id },
  };
}

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection("users");
    let user = await collections.findOne({ name: username });

    if (!user) {
      return res.status(500).connectDB("Users not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.paswordHash;

    if (!passwordCorrect) {
      return res.status(500).send("password incorrect");
    }
    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id,
    });
    let state = await assembleYserState(user);

    res.send({ token, state });
  });
};
