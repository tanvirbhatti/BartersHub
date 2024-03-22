import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminPanel } from '../../components/AdminPanel/AdminPanel';
import { Products } from '../../components/AdminPanel/Products';
import { Users } from '../../components/AdminPanel/Users';

describe('AdminPanel component', () => {
  test('renders correctly', () => {
    render(<AdminPanel />);
    // Check if the component renders without crashing
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
   
  });

  test('switches between components', () => {
    render(<AdminPanel />);
    // Click on 'Users' button
    fireEvent.click(screen.getByText('Users'));
    // Check if the Users component is rendered
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();

    // Click on 'Products' button
    fireEvent.click(screen.getByText('Products'));
    // Check if the Products component is rendered
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
  });

  test('renders Products component', () => {
    render(<Products />);
  });

  test('renders Users component', () => {
    render(<Users />);
  });

  test('profile image and user name are displayed', () => {
    render(<AdminPanel />);
  });

  test('Logout button functionality', () => {
    render(<AdminPanel />);
    const logoutMock = jest.fn();
    // Replace the logout function with your actual logout function
    window.alert = logoutMock;
    // Click on 'Logout' button
    fireEvent.click(screen.getByText('Logout'));
    // Check if the logout function is called
    expect(logoutMock).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
