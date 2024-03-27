// use react testing library to test the LoginPage
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { expect, test } from 'vitest'
import LoginPage from '../pages/Login';


test('renders login page', () => {
    render(<LoginPage />);
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
});