function FundList({ funds }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Available Funds</h2>
      <ul className="list-disc pl-5">
        {funds.map((fund) => (
          <li key={fund._id}>
            {fund.name} - Minimum: COP ${fund.minimumAmount.toLocaleString()} - Category: {fund.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FundList;