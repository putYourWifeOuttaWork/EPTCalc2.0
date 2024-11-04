import React, { useState, useEffect, useRef } from 'react';
import { Tooltip } from './Tooltip';
import { Trash2 } from 'lucide-react';
import { CalculationResult } from '../types';

interface CalculatorFormProps {
  onCalculate: (result: CalculationResult) => void;
  onDelete?: () => void;
  formIndex: number;
  autoScroll?: boolean;
}

export function CalculatorForm({ onCalculate, onDelete, formIndex, autoScroll }: CalculatorFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState('Service Agent');
  const [cost, setCost] = useState('45000');
  const [employees, setEmployees] = useState('1000');
  const [ept, setEpt] = useState(2.4);
  const [tasksPerDay, setTasksPerDay] = useState('90');
  const [clicksPerTask, setClicksPerTask] = useState('20');

  // EPT values in descending order with their corresponding clicks per minute
  const eptToClicksMap: [number, number][] = [
    [3.20, 3.47],
    [3.00, 3.66],
    [2.80, 3.73],
    [2.60, 3.89],
    [2.40, 4.15],
    [2.20, 4.52],
    [2.00, 5.05],
    [1.80, 5.76],
    [1.60, 6.73],
    [1.40, 8.05],
    [1.20, 9.07],
    [1.00, 12.47],
    [0.80, 16.41],
    [0.60, 22.93],
    [0.40, 35.85],
    [0.30, 48.55]
  ];

  const roleDefaults = {
    'Service Agent': { tasks: '90', clicks: '23' },
    'Sales Development Rep': { tasks: '120', clicks: '22' },
    'Account Executive': { tasks: '22', clicks: '200' }
  };

  useEffect(() => {
    if (autoScroll && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [autoScroll]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    const defaults = roleDefaults[newRole as keyof typeof roleDefaults];
    setTasksPerDay(defaults.tasks);
    setClicksPerTask(defaults.clicks);
  };

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    // Allow empty string or numbers only
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  const handleCalculate = () => {
    const minutesPerDay = 360; // 6 working hours
    const clicksPerMinute = eptToClicksMap.find(([e]) => e === ept)?.[1] || 4.15;
    const maxClicksPerDay = clicksPerMinute * minutesPerDay;
    const actualTasksPerDay = Math.floor(maxClicksPerDay / Number(clicksPerTask || 0));
    const productivity = (actualTasksPerDay / Number(tasksPerDay || 0)) * 100;
    const costNum = Number(cost || 0);
    const expectedValue = costNum * 2;
    const valueProduced = (productivity / 100) * expectedValue;
    const trueCost = valueProduced - expectedValue;
    const totalRoleValue = trueCost * Number(employees || 0);

    onCalculate({
      role,
      cost: costNum,
      expectedTasks: Number(tasksPerDay || 0),
      tasksPerDay: actualTasksPerDay,
      maxClicksPerDay,
      productivity,
      valueProduced,
      expectedValue,
      trueCost,
      totalRoleValue,
      employees: Number(employees || 0)
    });
  };

  return (
    <div ref={formRef} className="bg-white rounded-lg shadow p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Role Calculator {formIndex + 1}</h2>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            title="Delete calculator"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="block text-sm font-medium text-gray-700">Employee Role</div>
          <select
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Service Agent</option>
            <option>Sales Development Rep</option>
            <option>Account Executive</option>
          </select>
        </div>

        <div className="space-y-2">
          <Tooltip content="The estimated wage/year for employees in this role">
            Cost per Employee ($)
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={cost}
            onChange={(e) => handleNumberInput(e.target.value, setCost)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="How many full-time equivalent employees work in this role at the company">
            Number of Employees
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={employees}
            onChange={(e) => handleNumberInput(e.target.value, setEmployees)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="The quota of macro-tasks to be completed/day for basic or average performance, e.g. Service Agents might be 90 Cases/Day Closed Successfully, Sales Development reps may be expected to manage or generate 120 Leads/Day">
            Expected Tasks/Day
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={tasksPerDay}
            onChange={(e) => handleNumberInput(e.target.value, setTasksPerDay)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="How many clicks does it take on average, to complete a single macro-task, e.g. For a Service Agent, it may require 15 clicks to escalate a case type X, 35 clicks to close case type Y, and 20 clicks to close a quick case type Z, with the average being around 20 clicks across case-types">
            Est. Clicks/Task
          </Tooltip>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={clicksPerTask}
            onChange={(e) => handleNumberInput(e.target.value, setClicksPerTask)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Tooltip content="The rounded Average EPT for the org, or for the average EPT of the combined records and action load times for the Role-Specific interfaces and click-paths (e.g. For a Sales Development Rep; EPT may be either the weighted average EPT of the Lead Record, Lead qualification component, new lead generation, lead enrichment call-out action etc., OR the org Average EPT for a period of time)">
            EPT (seconds)
          </Tooltip>
          <select
            value={ept}
            onChange={(e) => setEpt(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {eptToClicksMap.map(([eptValue]) => (
              <option key={eptValue} value={eptValue}>{eptValue.toFixed(2)}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Calculate
      </button>
    </div>
  );
}