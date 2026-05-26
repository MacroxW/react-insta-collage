import { useMemo, useState } from 'react';
import type { StoryCustomElement, StoryElement } from '../../src';

interface VotingOption {
  id: string;
  label: string;
  votes: number;
}

export interface VotingElementProps {
  question: string;
  options: VotingOption[];
  totalVotes?: number;
  selectedOptionId?: string;
  onVote?: (optionId: string) => void;
}

export type VotingElement = StoryCustomElement<VotingElementProps> & {
  name: 'voting';
};

export const isVotingElement = (element: StoryElement): element is VotingElement => {
  return element.type === 'custom' && element.name === 'voting';
};

export const VotingSticker = ({ question, options, totalVotes, selectedOptionId, onVote }: VotingElementProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(selectedOptionId);
  const [localVotes, setLocalVotes] = useState<Record<string, number>>(() => {
    return Object.fromEntries(options.map((option) => [option.id, option.votes]));
  });
  const resolvedOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      votes: localVotes[option.id] ?? option.votes,
    }));
  }, [localVotes, options]);
  const resolvedTotalVotes = totalVotes ?? resolvedOptions.reduce((total, option) => total + option.votes, 0);

  const handleVote = (optionId: string) => {
    if (optionId === selectedId) return;

    setLocalVotes((current) => ({
      ...current,
      ...(selectedId ? { [selectedId]: Math.max((current[selectedId] ?? 0) - 1, 0) } : {}),
      [optionId]: (current[optionId] ?? 0) + 1,
    }));
    setSelectedId(optionId);
    onVote?.(optionId);
  };

  return (
    <div className="w-[280px] max-w-[78vw] rounded-2xl bg-white p-3 text-neutral-950 shadow-xl">
      <p className="mb-3 text-center text-sm font-extrabold">{question}</p>
      <div className="space-y-2">
        {resolvedOptions.map((option) => {
          const percentage = resolvedTotalVotes > 0 ? Math.round((option.votes / resolvedTotalVotes) * 100) : 0;
          const isSelected = option.id === selectedId;

          return (
            <button
              type="button"
              key={option.id}
              onClick={() => handleVote(option.id)}
              className={`relative block w-full cursor-pointer overflow-hidden rounded-xl border px-3 py-2 text-left text-xs font-bold ${
                isSelected ? 'border-pink-400 bg-pink-50' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
              }`}
            >
              <div
                className={`absolute inset-y-0 left-0 transition-[width] duration-300 ${isSelected ? 'bg-pink-200/80' : 'bg-neutral-200/80'}`}
                style={{ width: `${percentage}%` }}
              />
              <div className="relative flex items-center justify-between gap-3">
                <span>{option.label}</span>
                <span>{percentage}%</span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-center text-[11px] font-semibold text-neutral-500">{resolvedTotalVotes} votos</p>
    </div>
  );
};
