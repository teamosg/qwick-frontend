import { Link, useSearchParams } from "react-router-dom";
import successfull from "../../assets/successfull.gif";
import logo from "../../assets/logo.svg";
import { CheckCircle2, ArrowRight, Wallet, LayoutDashboard, Sparkles } from "lucide-react";

/**
 * DepositSuccess Component
 * -----------------------
 * This page is displayed after a successful Stripe deposit.
 * It shows the transition details and provides navigation to the wallet and dashboard.
 */
const DepositSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background dark:bg-zinc-950 relative overflow-hidden font-[Inter]">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground-strong/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-foreground-strong/5 rounded-full blur-[120px]"></div>

            <div className="max-w-lg w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white dark:border-zinc-800 relative z-10 transition-all hover:shadow-shadow-600/10">
                {/* Header/Banner */}
                <div className="relative h-48 bg-foreground-strong flex flex-col items-center justify-center overflow-hidden">
                    {/* Logo in top left of card */}
                    <div className="absolute top-6 left-8">
                        <img src={logo} alt="Logo" className="h-6 brightness-0 invert opacity-40 shrink-0" />
                    </div>

                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    </div>

                    <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                        <img
                            src={successfull}
                            alt="Success"
                            className="w-24 h-24 object-contain"
                        />
                    </div>
                </div>

                <div className="p-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-success-bg dark:bg-success/20 rounded-3xl mb-8 text-success dark:text-success rotate-12 transition-transform hover:rotate-0 duration-500">
                        <div className="rotate-[-12deg] group-hover:rotate-0 transition-transform">
                            <CheckCircle2 size={40} />
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight flex items-center justify-center gap-2">
                            Payment Received! <Sparkles className="text-yellow-400" size={24} />
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                            We've successfully processed your deposit. Your balance has been updated instantly.
                        </p>
                    </div>

                    {sessionId && (
                        <div className="mb-10 p-5 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border border-gray-100 dark:border-zinc-700/50 group transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800/60">
                            <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-zinc-700 pb-2">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Transaction Details</p>
                                <div className="px-3 py-1 bg-success-bg dark:bg-success/30 text-success dark:text-success text-[10px] rounded-full font-bold">STRIKE VERIFIED</div>
                            </div>
                            <p className="text-sm font-mono text-gray-500 dark:text-gray-400 break-all text-left">
                                {sessionId}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/dashboard/payments"
                            className="flex-1 flex items-center justify-center gap-3 bg-foreground-strong hover:bg-foreground text-white py-5 px-8 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-foreground-strong/25 group"
                        >
                            <Wallet size={20} />
                            <span>Go to Wallet</span>
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to="/dashboard"
                            className="flex-1 flex items-center justify-center gap-3 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-800 dark:text-white py-5 px-8 rounded-2xl font-bold border border-gray-200 dark:border-zinc-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <LayoutDashboard size={20} />
                            <span>Main Menu</span>
                        </Link>
                    </div>
                </div>

                <div className="py-6 border-t border-gray-50 dark:border-zinc-800/50 text-center bg-gray-50/50 dark:bg-zinc-900/50">
                    <p className="text-sm text-gray-400">
                        Need help with your transaction? <Link to="/need-help" className="text-foreground-strong font-bold hover:underline transition-colors decoration-2 underline-offset-4">Contact Support</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DepositSuccess;
