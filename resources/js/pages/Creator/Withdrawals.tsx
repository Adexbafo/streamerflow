import AppLayout from '@/layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function Withdrawals({
    wallet,
    withdrawals,
    flash,
}: any) {

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({

        amount: '',

        account_name: '',

        account_number: '',

        bank_name: '',

    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/withdrawals', {

            onSuccess: () => {

                toast.success(
                    'Withdrawal request submitted!'
                );

                reset();

            },

            onError: () => {

                toast.error(
                    'Withdrawal failed.'
                );

            },

        });
    }

    return (

        <AppLayout>

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Withdrawals
                </h1>

                {/* Balance Card */}

                <div className="
                    bg-white
                    border
                    rounded-3xl
                    p-6
                    mb-10
                ">

                    <div className="text-gray-500 mb-2">
                        Available Balance
                    </div>

                    <div className="text-4xl font-bold">
                        💰 {wallet?.balance ?? 0} Coins
                    </div>

                </div>

                {/* Withdrawal Form */}

                <div className="
                    bg-white
                    border
                    rounded-3xl
                    p-6
                    mb-10
                ">

                    <h2 className="text-2xl font-bold mb-6">
                        Request Withdrawal
                    </h2>

                    <form
                        onSubmit={submit}
                        className="space-y-4"
                    >

                        <input
                            type="number"
                            placeholder="Amount"
                            value={data.amount}
                            onChange={(e) =>
                                setData(
                                    'amount',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        />

                        {errors.amount && (
                            <div className="text-red-500 text-sm mt-2">
                                {errors.amount}
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Account Name"
                            value={data.account_name}
                            onChange={(e) =>
                                setData(
                                    'account_name',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        />

                        <input
                            type="text"
                            placeholder="Account Number"
                            value={data.account_number}
                            onChange={(e) =>
                                setData(
                                    'account_number',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        />

                        <input
                            type="text"
                            placeholder="Bank Name"
                            value={data.bank_name}
                            onChange={(e) =>
                                setData(
                                    'bank_name',
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-2xl
                                px-4
                                py-3
                            "
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                bg-black
                                text-white
                                px-6
                                py-3
                                rounded-2xl
                                font-bold
                            "
                        >
                            Submit Withdrawal
                        </button>

                    </form>

                </div>

                {/* Withdrawal History */}

                <div className="
                    bg-white
                    border
                    rounded-3xl
                    p-6
                ">

                    <h2 className="text-2xl font-bold mb-6">
                        Withdrawal History
                    </h2>

                    <div className="space-y-4">

                        {withdrawals?.length === 0 ? (

                            <div className="text-gray-500 text-center py-6">
                                No withdrawals yet.
                            </div>

                        ) : (

                            withdrawals?.map((item: any) => (

                                <div
                                    key={item.id}
                                    className="
                flex
                items-center
                justify-between
                border-b
                pb-4
            "
                                >

                                    <div>

                                        <div className="font-bold">
                                            {item.bank_name}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {item.account_number}
                                        </div>

                                    </div>

                                    <div className="text-right">

                                        <div className="font-bold">
                                            {item.amount} Coins
                                        </div>

                                        <div
                                            className={`
                        text-sm
                        font-bold
                        ${item.status === 'completed'
                                                    ? 'text-green-600'
                                                    : 'text-yellow-600'
                                                }
                    `}
                                        >
                                            {item.status}
                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </AppLayout>

    );

}