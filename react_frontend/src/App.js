import "./App.css";
import CusomerList from "./components/CustomerList";
import avatar from "./components/images/customersavatar.png";
function App() {
  return (
    <div className="App">
      <div className="text-center">
        <div
          className="col-12"
          style={{ position: "relative", display: "inline-block" }}
        >
          <img
            src={avatar}
            alt="Customer Service App"
            style={{ width: "100%" }}
          />
          <h1
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
            className="text-warning"
          >
            Customer Service App
          </h1>
        </div>
      </div>

      <h2 className="text-success m-4">Customer's List</h2>
      <CusomerList />
    </div>
  );
}

export default App;
