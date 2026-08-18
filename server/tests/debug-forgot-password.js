// Test script to debug forgot password error
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

async function testForgotPassword() {
    console.log('🔍 Testing forgot password endpoint...\n');
    
    try {
        const response = await axios.post(`${BASE_URL}/api/user/forgot-password`, {
            email: 'john.doe@example.com'
        });
        
        console.log('✅ Success:', response.data);
        
    } catch (error) {
        console.log('❌ Error occurred:');
        console.log('Status:', error.response?.status);
        console.log('Data:', error.response?.data);
        console.log('Full error:', error.message);
    }
}

testForgotPassword();