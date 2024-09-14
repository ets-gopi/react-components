export const initialState = { startDate: "", purpose: "", duration: "" };
export function reducer(state, action) {
  //console.log(state,action);
  switch (action.type) {
    case "startDate":
      return { ...state, startDate: action.payload };
    case "purpose":
      return { ...state, purpose: action.payload };
    case "duration":
      return { ...state, duration: action.payload };
    case "reset":
      return { startDate: "", purpose: "", duration: "" };
    default:
      return state;
  }
}