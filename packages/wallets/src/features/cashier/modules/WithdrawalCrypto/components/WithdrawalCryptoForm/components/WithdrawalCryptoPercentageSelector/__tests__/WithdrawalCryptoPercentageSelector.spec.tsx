import React from 'react';
import * as formik from 'formik';
import { render, screen } from '@testing-library/react';
import { useWithdrawalCryptoContext } from '../../../../../provider';
import WithdrawalCryptoPercentageSelector from '../WithdrawalCryptoPercentageSelector';

jest.mock('../../../../../provider', () => ({
    ...jest.requireActual('../../../../../provider'),
    useWithdrawalCryptoContext: jest.fn(),
}));

const mockUseFormikContext = jest.spyOn(formik, 'useFormikContext') as jest.Mock;
const mockUseWithdrawalCryptoContext = useWithdrawalCryptoContext as jest.Mock;

describe('<WithdrawalCryptoPercentageSelector />', () => {
    it('should show the percentage message when the input amount is between min withdrawal limit and max withdrawal limit', () => {
        mockUseFormikContext.mockReturnValue({
            values: {
                cryptoAmount: '9.00000000',
            },
        });
        mockUseWithdrawalCryptoContext.mockReturnValue({
            activeWallet: {
                balance: 10,
                currency: 'BTC',
                display_balance: '10.00000000 BTC',
            },
        });

        render(<WithdrawalCryptoPercentageSelector />);
        expect(screen.getByText('90% of available balance (10.00000000 BTC)')).toBeInTheDocument();
    });

    it('should hide the percentage message when the input amount is between min withdrawal limit and max withdrawal limit', () => {
        mockUseFormikContext.mockReturnValue({
            values: {
                cryptoAmount: '11.00000000',
            },
        });
        mockUseWithdrawalCryptoContext.mockReturnValue({
            activeWallet: {
                balance: 10,
                currency: 'BTC',
                display_balance: '10.00000000 BTC',
            },
        });

        render(<WithdrawalCryptoPercentageSelector />);
        expect(screen.queryByText('90% of available balance (10.00000000 BTC)')).not.toBeInTheDocument();
    });
});
