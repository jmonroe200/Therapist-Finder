import React, { useState, useCallback } from 'react';
import type { Therapist } from './types';
import { findTherapists } from './services/geminiService';
import SearchBar from './components/SearchBar';
import TherapistCard from './components/TherapistCard';
import LoadingSpinner from './components/LoadingSpinner';
import { TherapistIcon } from './components/icons/TherapistIcon';

const App: React.FC = () => {
  const [zipcode, setZipcode] = useState<string>('');
  const [therapists, setTherapists] = useState<Therapist[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!/^\d{5}$/.test(zipcode)) {
      setError('Please enter a valid 5-digit zipcode.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTherapists(null);

    try {
      const results = await findTherapists(zipcode);
      setTherapists(results);
    } catch (err) {
      console.error(err);
      setError('Sorry, we couldn\'t fetch therapist data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [zipcode]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <LoadingSpinner />
          <p className="mt-4 text-slate-500">Searching for therapists near you...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">
          <p>{error}</p>
        </div>
      );
    }

    if (therapists === null) {
      return (
        <div className="text-center p-8 text-slate-500">
          <p>Enter your zipcode to find mental health professionals in your area.</p>
        </div>
      );
    }

    if (therapists.length === 0) {
      return (
        <div className="text-center p-8 text-slate-500">
          <p>No therapists found for zipcode <span className="font-semibold">{zipcode}</span>. Please try a different area.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-700 px-1">Therapists near {zipcode}</h2>
        {therapists.map((therapist, index) => (
          <TherapistCard key={index} therapist={therapist} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8 flex items-start justify-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <header className="flex items-center space-x-4">
          <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
            <TherapistIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Therapist Finder</h1>
            <p className="text-slate-500">Your local guide to mental wellness.</p>
          </div>
        </header>
        
        <main>
          <SearchBar
            zipcode={zipcode}
            setZipcode={setZipcode}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          <div className="mt-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
