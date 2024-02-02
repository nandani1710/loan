import React, { useState } from 'react';

const App = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [startDate, setStartDate] = useState(getTodayDate());
  const [amortizationData, setAmortizationData] = useState([]);

  function getTodayDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // return ${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day};
  }

  function calculateAmortization() {
    let balance = parseFloat(loanAmount);
    
    const interestRateMonthly = parseFloat(interestRate) / 100 / 12;
    const terms = parseInt(term) * 12;
    const payment = (interestRateMonthly * balance) / (1 - Math.pow(1 + interestRateMonthly, -terms));

    let amortizationList = [];

    for (let i = 1; i <= terms; i++) {
      const interest = balance * interestRateMonthly;
      const principal = payment - interest;
      const amount = balance - principal;

      amortizationList.push({
        balance: balance.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        amount: Math.abs(amount.toFixed(2)),
      });

      balance = amount;
    }

    setAmortizationData(amortizationList);
  }

  return (
    <div>
      <h1>Amortization Calculator</h1>
      <h3>Loan amount :</h3>
      <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
      <h3>Interest Rate :</h3>
      <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} /><br />
      <h3>Term :</h3>
      <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} />
      <h3>Start Date :</h3>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /><br />
      <button onClick={calculateAmortization}>CALCULATE</button><br />

      <table border="1">
        <thead>
          <tr>
            <td>Balance</td>
            <td>Principal</td>
            <td>Interest</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {amortizationData.map((data, index) => (
            <tr key={index}>
              <td>{data.balance}</td>
              <td>{data.principal}</td>
              <td>{data.interest}</td>
              <td>{data.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
