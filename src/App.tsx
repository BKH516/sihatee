import { Toaster } from "react-hot-toast";
import Service from './components/Service';

function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Toaster position="top-right" />
      <Service />
    </div>
  );
}

export default App;
