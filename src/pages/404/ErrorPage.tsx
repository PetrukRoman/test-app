import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <div>
      <h1>Ooops somethins went wrong...</h1>
      {error && <p>{error.message} </p>}
    </div>
  );
};

export default ErrorPage;
