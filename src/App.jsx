import useAuth from "./hooks/useAuth";
import Home from "./layout/Home";
import AppRouter from "./routes/AppRouter";

function App() {
  const {loading} = useAuth()

  if(loading) {
    return (
      <p className="text-4xl text-primary">Loading..</p>
    )
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <AppRouter />
    </div>
  );
}

export default App;
