import React, { useRef, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { TextArea, Form } from "semantic-ui-react";

import { saveCallNotes } from "../store/actions/actions";

const DEBOUNCE_TIME = 250;

function CallNotes() {
    const dispatch = useDispatch();

    const debounceTimeoutId = useRef<number>();

    function handleNotesChange(event: SyntheticEvent, data: any) {
        if (debounceTimeoutId.current != null) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            const { value } = data || {};
            dispatch(saveCallNotes(value));
        }, DEBOUNCE_TIME);
    }

    return (
        <Form>
            <TextArea onChange={handleNotesChange} placeholder="Tell us more" />
        </Form>
    );
}

export default CallNotes;
