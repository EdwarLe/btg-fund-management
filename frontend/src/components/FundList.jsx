function FundList({ funds }) {
    return (
        <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Available Funds</h2>
        <table>
            <thead className="font-semibold border border-slate-500 bg-blue-500 text-white">
            <tr className="divide-x">
                <td className="p-1 text-center">Name</td>
                <td className="p-1 text-center">Minimun</td>
                <td className="p-1 text-center">Category</td>
            </tr>
            </thead>
            <tbody className="border">
            {
                funds.map((fund) => (
                <tr key={fund._id} className="border divide-x border-slate-500 divide-slate-500">
                    <td className="p-1">{fund.name}</td>
                    <td className="p-1">COP ${fund.minimumAmount.toLocaleString()}</td>
                    <td className="p-1">{fund.category}</td>
                </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    );
}

export default FundList;