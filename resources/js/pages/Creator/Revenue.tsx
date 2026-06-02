import AppLayout from '@/layouts/AppLayout';

export default function Revenue({
    wallet,
    recentTips,
    topSupporters,
    transactions,
}: any) {

    return (

        <AppLayout>

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Revenue Dashboard
                </h1>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-3xl p-6 border">

                        <div className="text-gray-500 mb-2">
                            Current Balance
                        </div>

                        <div className="text-3xl font-bold">
                            💰 {wallet?.balance ?? 0} Coins
                        </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 border">

                        <div className="text-gray-500 mb-2">
                            Lifetime Earned
                        </div>

                        <div className="text-3xl font-bold">
                            🔥 {wallet?.lifetime_earned ?? 0} Coins
                        </div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 border">

                        <div className="text-gray-500 mb-2">
                            Total Tips
                        </div>

                        <div className="text-3xl font-bold">
                            🎁 {recentTips?.length ?? 0}
                        </div>

                    </div>

                </div>

                {/* Supporters Grid */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

                    {/* Recent Supporters */}

                    <div className="bg-white rounded-3xl border p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Recent Supporters
                        </h2>

                        <div className="space-y-4">

                            {recentTips?.length === 0 ? (
                                <div className="text-gray-500 py-4 text-center">No tips received yet.</div>
                            ) : (
                                recentTips?.map((tip: any) => (
                                    <div
                                        key={tip.id}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            last:border-b-0
                                            pb-4
                                            last:pb-0
                                        "
                                    >
                                        <div>
                                            <div className="font-bold">
                                                {tip.sender?.username}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Sent support to your stream
                                            </div>
                                        </div>
                                        <div className="font-bold text-yellow-600">
                                            +{tip.amount} Coins
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>

                    </div>

                    {/* Top Supporters */}

                    <div className="bg-white rounded-3xl border p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Top Supporters
                        </h2>

                        <div className="space-y-4">

                            {topSupporters.length === 0 ? (
                                <div className="text-gray-500 py-4 text-center">No supporters yet.</div>
                            ) : (
                                topSupporters.map((supporter: any) => (
                                    <div
                                        key={supporter.sender_id}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            last:border-b-0
                                            pb-4
                                            last:pb-0
                                        "
                                    >
                                        <div>
                                            <div className="font-bold">
                                                {supporter.sender?.username}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Total support sent
                                            </div>
                                        </div>
                                        <div className="font-bold text-yellow-600">
                                            💰 {supporter.total_tipped} Coins
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>

                    </div>

                </div>

                {/* Recent Transactions */}

                <div className="bg-white rounded-3xl border p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Recent Transactions
                    </h2>

                    <div className="overflow-x-auto">

                        {transactions.length === 0 ? (
                            <div className="text-gray-500 py-4 text-center">No transactions recorded yet.</div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b text-gray-500">
                                        <th className="pb-4 font-semibold">Sender</th>
                                        <th className="pb-4 font-semibold">Amount</th>
                                        <th className="pb-4 font-semibold">Status</th>
                                        <th className="pb-4 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction: any) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b last:border-b-0 hover:bg-gray-50/50"
                                        >
                                            <td className="py-4">
                                                {transaction.sender?.username}
                                            </td>
                                            <td className="py-4 font-bold text-yellow-600">
                                                +{transaction.amount} Coins
                                            </td>
                                            <td className="py-4">
                                                <span
                                                    className="
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-medium
                                                        bg-green-50
                                                        text-green-700
                                                        border
                                                        border-green-200
                                                    "
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {new Date(
                                                    transaction.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </div>

                </div>

            </div>

        </AppLayout>

    );

}