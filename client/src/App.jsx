import {
  NavBar,
  Welcome,
  Footer,
  Loader,
  Transactions,
  Services,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
