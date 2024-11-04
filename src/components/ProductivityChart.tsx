import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculationResult } from '../types';

interface Props {
  result: CalculationResult;
}

export function ProductivityChart({ result }: Props) {
  const data = [
    {
      name: result.role,
      'Benchmark Wage': result.cost,
      'Value Produced': result.valueProduced,
      'Cost/Benefit': result.trueCost,
    },
  ];

  const isAtOrAboveExpected = result.valueProduced >= result.expectedValue;
  const isBelowExpectedButPositive = result.valueProduced < result.expectedValue && result.valueProduced > result.cost;

  return (
    <div className="w-full h-[300px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend />
          <Bar 
            dataKey="Benchmark Wage" 
            fill="#3b82f6"
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="Value Produced" 
            fill={
              isAtOrAboveExpected 
                ? "#10b981"
                : isBelowExpectedButPositive 
                  ? "#8b5cf6"
                  : "#ef4444"
            } 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="Cost/Benefit" 
            fill={
              isAtOrAboveExpected 
                ? "#10b981"
                : isBelowExpectedButPositive 
                  ? "#8b5cf6"
                  : "#ef4444"
            } 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}