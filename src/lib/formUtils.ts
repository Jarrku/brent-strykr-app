import { FormEvent, useReducer } from 'react';
import { createRequest } from './fetchUtils';
import { EmailProps } from './types';

type Status = 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED';
export interface FormState {
  status: Status;
  hasErrored: boolean;
  policiesAccepted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  remark: string;
}

type Action =
  | {
      type: 'policiesAccepted';
      value: boolean;
    }
  | {
      type: 'status';
      value: Status;
    }
  | {
      type: 'firstName' | 'lastName' | 'email' | 'remark';
      value: string;
    };

const initialState: FormState = {
  status: 'IDLE',
  hasErrored: false,
  policiesAccepted: false,
  firstName: '',
  lastName: '',
  email: '',
  remark: '',
};

function formReducer(state: FormState, action: Action) {
  let newState = { ...state, [action.type]: action.value };

  if (action.type === 'status' && action.value === 'FAILED') {
    newState = { ...newState, hasErrored: true };
  } else if (action.type === 'status' && action.value === 'SUCCESS') {
    newState = { ...newState, hasErrored: false };
  }

  return newState;
}

export function submitEmail(data: EmailProps) {
  return createRequest('/api/mail', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function useEmailForm(handleSubmit: (state: FormState) => Promise<unknown>) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.status === 'PENDING' || state.status === 'SUCCESS') return;

    dispatch({ type: 'status', value: 'PENDING' });

    try {
      await handleSubmit(state);
      dispatch({ type: 'status', value: 'SUCCESS' });
    } catch (err) {
      console.error(err);
      dispatch({ type: 'status', value: 'FAILED' });
    }
  };

  return [state, dispatch, onSubmit] as const;
}
