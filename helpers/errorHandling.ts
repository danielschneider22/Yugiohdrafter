import _ from "lodash";
import { Dispatch } from "react";
import { toastBGColorDict } from "../constants/Toast";
import { addToast } from "../data/toasts/actions";

export async function getJSONWithErrorHandling(response: Response, dispatch: Dispatch<any>, description?: string, title?: string) {
    let responseJSON = await response.json();
    if(responseJSON.error) {
        dispatch(addToast({id: _.uniqueId("error-"), type: "Danger", description: description || "Error", title: title || "Draft Complete", backgroundColor: toastBGColorDict["Danger"]}))
        return undefined;
    }
    return responseJSON
}