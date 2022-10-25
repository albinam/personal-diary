const initialState = {
  isShown: false,
  message: '',
  type: '',
  response: '',
};

export default function alertReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_CLOSE_ALERT': {
      return {
        ...state,
        isShown: false,
        message: '',
        type: '',
        response: '',
      };
    }
    case 'SET_ALERT': {
      return {
        ...state,
        isShown: true,
        message: action.payload.message,
        type: action.payload.type,
        response: '',
      };
    }
    case 'SET_ALERT_RESPONSE': {
      return {
        ...state,
        response: action.payload,
      };
    }
    default:
      return state;
  }
}
