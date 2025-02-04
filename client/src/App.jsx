import {
  NavBar,
  Welcome,
  Footer,
  Loader,
  Transactions,
  Services,
} from "./components";
// import TransactionProvider from "./context/TransactionContext";

const App = () => {
  return (
    // <TransactionProvider>
    <div className="min-h-screen text-white">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
    // </TransactionProvider>
  );
};

export default App;
