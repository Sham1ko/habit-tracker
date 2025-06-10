import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { calculateStreak, getCompletionRate, getHabitStats } from '../lib/stats-utils';
import { Habit, Activity } from '../types/habit';

describe('calculateStreak', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-10'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 for no activities', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('counts consecutive days', () => {
    const activities: Activity[] = [
      { id: '1', date: new Date('2023-01-10'), habitId: 'h1' },
      { id: '2', date: new Date('2023-01-09'), habitId: 'h1' },
      { id: '3', date: new Date('2023-01-08'), habitId: 'h1' },
      { id: '4', date: new Date('2023-01-06'), habitId: 'h1' },
    ];
    expect(calculateStreak(activities)).toBe(3);
  });

  it('returns 0 when today is missing', () => {
    const activities: Activity[] = [
      { id: '1', date: new Date('2023-01-09'), habitId: 'h1' },
    ];
    expect(calculateStreak(activities)).toBe(0);
  });
});

describe('getCompletionRate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-10'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates daily rate', () => {
    const activities: Activity[] = [
      { id: '1', date: new Date('2023-01-01'), habitId: 'h1' },
      { id: '2', date: new Date('2023-01-03'), habitId: 'h1' },
      { id: '3', date: new Date('2023-01-05'), habitId: 'h1' },
      { id: '4', date: new Date('2023-01-10'), habitId: 'h1' },
    ];
    expect(getCompletionRate(activities, 'daily', new Date('2023-01-01'))).toBe(40);
  });

  it('calculates weekly rate', () => {
    const activities: Activity[] = [
      { id: '1', date: new Date('2023-01-03'), habitId: 'h1' },
    ];
    expect(getCompletionRate(activities, 'weekly', new Date('2023-01-01'))).toBe(50);
  });

  it('calculates monthly rate', () => {
    const activities: Activity[] = [
      { id: '1', date: new Date('2023-01-03'), habitId: 'h1' },
    ];
    expect(getCompletionRate(activities, 'monthly', new Date('2023-01-01'))).toBe(100);
  });
});

describe('getHabitStats', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-10'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns combined statistics', () => {
    const habit: Habit = {
      id: 'h1',
      title: 'Test',
      description: null,
      frequency: 'daily',
      createdAt: new Date('2023-01-01'),
      activities: [
        { id: '1', date: new Date('2023-01-10'), habitId: 'h1' },
        { id: '2', date: new Date('2023-01-09'), habitId: 'h1' },
      ],
    };
    expect(getHabitStats(habit)).toEqual({
      completionRate: 20,
      currentStreak: 2,
      totalCheckIns: 2,
    });
  });
});
