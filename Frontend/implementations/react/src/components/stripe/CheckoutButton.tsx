import React from 'react';

import createCheckoutSession from '../../utils/createCheckoutSession';

const CheckoutButton = () => {
    return (
        <button role="link" onClick={createCheckoutSession}>
            Checkoutss
        </button>
    );
};

export default CheckoutButton;
