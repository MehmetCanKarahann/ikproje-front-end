import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface IDashBoard {
  departments: string[],
  employeeCounts: number[],
  genderDistribution:number[]
}

const Dashboard = (props: IDashBoard) => {
  const [employeeData, setEmployeeData] = useState<any>(null);  

  useEffect(() => {
    const data = {
      departments: props.departments,
      employeeCounts: props.employeeCounts,
      genderDistribution: props.genderDistribution, // Erkek-Kadın oranı
    };
    setEmployeeData(data);
  }, []);

  const barChartData = employeeData
    ? employeeData.departments.map((dept: string, index: number) => ({
        department: dept,
        count: employeeData.employeeCounts[index],
      }))
    : [];

  const pieChartData = employeeData
    ? [
        { id: 'Erkek', label: 'Erkek', value: employeeData.genderDistribution[0] },
        { id: 'Kadın', label: 'Kadın', value: employeeData.genderDistribution[1] },
      ]
    : [];

  return (
    <div>
      <div className="card card-transparent border-0 rounded-lg">
        <div className="card-body">
          <h2 className="text-center mb-4 text-primary">Personel İstatistikleri</h2>

          {/* Container for the charts */}
          <div className="d-flex justify-content-between">
            {/* Bar Chart */}
            <div style={{ flex: 1, marginRight: '10px' }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name={'Departmanlara göre çalışan sayıları'} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="id"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#ec4899'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
