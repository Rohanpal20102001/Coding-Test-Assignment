const data1 = require("./1-input.json");
const data2 = require("./2-input.json");

function calculateBalanceSheet(data) {
  const { expenseData, revenueData } = data;
  const balances = {};

  revenueData.forEach((entry) => {
    const { amount, startDate } = entry;
    const month = startDate.slice(0, 24);
    balances[month] = (balances[month] || 0) + amount;
  });

  expenseData.forEach((entry) => {
    const { amount, startDate } = entry;
    const month = startDate.slice(0, 24);
    balances[month] = (balances[month] || 0) - amount;
  });

  const sortedBalances = Object.entries(balances).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const balanceSheet = sortedBalances.map(([startDate, amount]) => ({
    amount,
    startDate,
  }));

  return { balance: balanceSheet };
}

const balanceSheet1 = calculateBalanceSheet(data1);
const balanceSheet2 = calculateBalanceSheet(data2);
console.log(JSON.stringify(balanceSheet1, null, 2));
console.log(JSON.stringify(balanceSheet2, null, 2));
