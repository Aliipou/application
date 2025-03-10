import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock axios to simulate an API response
jest.mock('axios');

test('loads and displays data from API', async () => {
    // Simulate an API response with an array of items
    axios.get.mockResolvedValue({
        data: [
            { id: 1, name: 'Item 1', description: 'Description of Item 1', price: 10 },
            { id: 2, name: 'Item 2', description: 'Description of Item 2', price: 20 },
        ],
    });

    render(<App />);

    // Wait for "Item 1" to appear in the document with a more flexible matcher
    const item1 = await screen.findByText((content, element) => {
        return content.includes('Item 1');
    });

    expect(item1).toBeInTheDocument();

    const item2 = await screen.findByText((content, element) => {
        return content.includes('Item 2');
    });

    expect(item2).toBeInTheDocument();
});
