import React from 'react';
import type { Therapist } from '../types';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationIcon } from './icons/LocationIcon';

interface TherapistCardProps {
  therapist: Therapist;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-teal-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-5">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-800">{therapist.name}</h3>
          <p className="text-sm text-teal-600 bg-teal-50 rounded-full px-3 py-1 inline-block mt-1">
            {therapist.specialty}
          </p>
          <div className="mt-4 space-y-3 text-slate-600">
            <div className="flex items-start gap-3">
              <LocationIcon className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" />
              <span>{therapist.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-slate-400 shrink-0" />
              <a href={`tel:${therapist.phone}`} className="hover:text-teal-600 hover:underline">
                {therapist.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
