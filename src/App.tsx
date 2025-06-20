
import { Button } from '@/components/ui/button';

function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Button className="bg-red-600 hover:bg-red-800 text-white text-xl px-8 py-4 rounded-lg shadow-lg transition-all duration-300">
        shadcn تعديل زر 
        </Button>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tailwind CSS is Working!</h1>
        <p className="text-gray-600">If you see this styled box, Tailwind is set up correctly 🎉</p>
        <h5 className='text-red-600 bg-slate-300'>no</h5>
        <dialog/>
      </div>
    </div>
  );
}

export default App;
