import                     "../../styles/Error.modules.css";
import MainNavigation from "../../components/MainNavigation";
import Footer         from "../../components/Footer";
import { Link }       from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error">
      <MainNavigation />
      <main>
        <h1>An <label>error</label> occurred!</h1>
        <h3>Could not find this page!</h3>
        <p>
          <Link to="/">Take me Home</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
