import { SpeechFlashcard } from "@/components/SpeechFlashcard";


function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-primary-900/20">
      <main className="mx-auto pt-4  md:p-8 md:max-w-7xl w-full min-h-screen flex flex-col items-center lg:gap-8">
        {/* Title */}
        <div className="mb-2 md:mb-8 lg:mb-0 mt-2 md:mt-0 lg:pt-4">
          <h1 className="text-3xl md:text-4xl text-primary-400 font-serif text-center lg:text-left tracking-tight">
            Speech Flashcards
          </h1>
        </div>

        {/* SpeechFlashcard - Full available height */}
        <div className="flex-1 w-full flex flex-col lg:min-h-150 p-1 md:p-4">
          <SpeechFlashcard />
        </div>
      </main>
    </div>
  );
}

export default App;

