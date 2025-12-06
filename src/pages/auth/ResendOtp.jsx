import { useForgotPassword, useSignIn } from '@/hooks/auth.hook';
import React, { useEffect, useState } from 'react';

const ResendOtp = ({ type, email, data }) => {
    const [timer, setTimer] = useState(20);
    const {
        mutate: resendForgotPasswordOTP,
        isPending: isForgotPasswordOTPResending
    } = useForgotPassword();

    const { mutate: againSignIn,
        isPending: isAgainSigningIn
    } = useSignIn();


    // Countdown effect
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    console.log(data);



    const handleResendOtp = () => {
        if (type === "forgot-password") {
            resendForgotPasswordOTP({ email });
            setTimer(20);
        }

        if (type === "verify-account") {
            againSignIn({ email, password: data?.password })
            setTimer(20);
        }
    };



    return (
        <div className="text-left">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
                Didn't receive the email?{" "}

                <button
                    disabled={isForgotPasswordOTPResending || isAgainSigningIn || timer > 0}
                    onClick={handleResendOtp}
                    type="button"
                    className="text-[#003933] cursor-pointer dark:text-white font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Click to resend code
                </button>

                {timer > 0 && (
                    <span className="ml-2 text-gray-500 text-sm">
                        ({timer}s)
                    </span>
                )}
            </p>
        </div>
    );
};

export default ResendOtp;
