import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const { from } = history.location.state || { from: { pathname: '/' } };

export {
  history,
  from
};
