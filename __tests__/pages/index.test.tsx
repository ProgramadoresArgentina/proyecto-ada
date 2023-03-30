import { fireEvent, render, screen } from '@testing-library/react';

import Home from '../../pages';

describe('Home Page', () => {

    beforeEach(() => {
        render(<Home />);
    })

    it('should be rendering a staff message', () => {
        const staffText = screen.getByTestId('text-staff');
        expect(staffText).toHaveTextContent('Staff');
    })

    it('should be rendering a staff message', () => {
        const staffText = screen.getByTestId('text-staff');
        expect(staffText).toHaveTextContent('Staff');
    })
})
