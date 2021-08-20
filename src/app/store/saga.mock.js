import { take, put, select } from "redux-saga/effects";
import * as mutations from "./mutation";
import uuid from "uuid/dist/v1";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = "U1";
    //const ownerID = yield select((state) => state.session.id);
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    console.log("Got group Id...", groupID);
  }
}
