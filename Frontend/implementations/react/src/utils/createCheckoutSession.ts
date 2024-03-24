import { Stripe, loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NuF7hARqAZBDJL2wmP1ekFEkIkezpLuQfYUpaJyg8nXPr1BQ7pXfxJ54idHWxorgHtBUPyARw1ZOkMm77XFsf1900Vqe6JIzA');

interface CheckoutSessionResponse {
    sessionId: string;
    // Add other properties that you expect to receive from your API
}

const createCheckoutSession = async () => {
    let stripe: Stripe | null;

    try {
        stripe = await stripePromise;
        if (!stripe) {
            throw new Error('Stripe initialization failed.');
        }

        // サーバーにセッションを作成するように要求
        const response = await fetch('http://dollgen.tplinkdns.com/create-checkout-session', { method: 'POST' });
        const session = await response.json() as CheckoutSessionResponse;

        const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
        });

        if (result.error) {
            // ユーザーがチェックアウトページにリダイレクトされなかった場合のエラーを表示
            console.error(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default createCheckoutSession;