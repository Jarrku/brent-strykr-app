import { useCallback, useReducer } from 'react';

type Status = 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED';
interface State {
  status: Status;
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
      type: 'firstName' | 'lastName' | 'email';
      value: string;
    };

const initialState: State = {
  status: 'IDLE',
  policiesAccepted: false,
  firstName: '',
  lastName: '',
  email: '',
  remark: '',
};

function formReducer(state: State, action: Action) {
  return { ...state, [action.type]: action.value };
}

export function useContactForm() {
  const transform = useCallback((state: State) => ({}), []);

  const isValid = useCallback(
    (state: State) =>
      Boolean(state.email && state.firstName && state.lastName && state.policiesAccepted && state.remark),
    [],
  );

  return useEmailForm(transform, isValid);
}

export function usePricingForm() {
  const transform = useCallback((state: State) => ({}), []);
  const isValid = useCallback(
    (state: State) => Boolean(state.email && state.firstName && state.lastName && state.policiesAccepted),
    [],
  );

  return useEmailForm(transform, isValid);
}

function useEmailForm(transform: (state: State) => unknown, isValid: (state: State) => boolean) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const valid = isValid(state);

  const onSubmit = async () => {
    if (!valid || state.status === 'PENDING' || state.status === 'SUCCESS') return;

    dispatch({ type: 'status', value: 'PENDING' });

    try {
      await fetch('/api/maill', {
        method: 'POST',
        body: JSON.stringify(transform(state)),
      });
      dispatch({ type: 'status', value: 'SUCCESS' });
    } catch (err) {
      console.error(err);
      dispatch({ type: 'status', value: 'FAILED' });
    }
  };

  return [state, dispatch, onSubmit, valid] as const;
}
