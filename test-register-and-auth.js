/**
 * Test script: Register a test user and then authenticate to get token
 * Run with: node test-register-and-auth.js
 */

const testRegisterAndAuth = async () => {
  const baseUrl = 'http://localhost:8000';
  const registerUrl = `${baseUrl}/Api/_000_ERP_Authentication/Register`;
  const authUrl = `${baseUrl}/Api/_000_ERP_Authentication/Authenticate`;
  
  // Generate unique test user credentials
  const timestamp = Date.now();
  
  // Try different systemId/tableId combinations
  const testConfigs = [
    { systemId: 0, tableId: 0 },
    { systemId: 1, tableId: 0 },
    { systemId: 17, tableId: 0 }, // Common system ID from codebase
  ];
  
  const testUser = {
    systemId: testConfigs[0].systemId,
    tableId: testConfigs[0].tableId,
    userName: `testuser_${timestamp}`,
    password: `testpass_${timestamp}`,
    parameter01: "test",
    parameter02: "test",
    parameter03: "test",
    parameter04: "test",
    parameter05: "test"
  };
  
  console.log('Note: Registration might require specific systemId/tableId values.');
  console.log('If authentication fails, the registered user might need activation or different systemId/tableId.\n');

  try {
    console.log('='.repeat(60));
    console.log('STEP 1: Registering test user...');
    console.log('='.repeat(60));
    console.log('URL:', registerUrl);
    console.log('Data:', JSON.stringify(testUser, null, 2));
    console.log('\nSending registration request...\n');

    // Step 1: Register
    const registerResponse = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    console.log('Registration Status:', registerResponse.status, registerResponse.statusText);
    console.log('Registration Headers:', Object.fromEntries(registerResponse.headers.entries()));

    const registerResponseText = await registerResponse.text();
    if (registerResponseText) {
      try {
        const registerJson = JSON.parse(registerResponseText);
        console.log('Registration Response:', JSON.stringify(registerJson, null, 2));
      } catch {
        console.log('Registration Response (text):', registerResponseText);
      }
    } else {
      console.log('Registration Response: Empty (204 No Content)');
    }

    if (!registerResponse.ok) {
      console.error('\n❌ Registration failed with status:', registerResponse.status);
      return;
    }

    console.log('\n✅ Registration successful!');
    
    // Wait a moment for registration to be processed
    console.log('\nWaiting 2 seconds for registration to be processed...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n' + '='.repeat(60));
    console.log('STEP 2: Authenticating with registered credentials...');
    console.log('='.repeat(60));
    console.log('URL:', authUrl);
    console.log('Credentials:', JSON.stringify({
      systemId: testUser.systemId,
      tableId: testUser.tableId,
      userName: testUser.userName,
      password: testUser.password
    }, null, 2));
    console.log('\nSending authentication request...\n');

    // Step 2: Authenticate
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        systemId: testUser.systemId,
        tableId: testUser.tableId,
        userName: testUser.userName,
        password: testUser.password
      }),
    });

    console.log('Authentication Status:', authResponse.status, authResponse.statusText);
    console.log('Authentication Headers:', Object.fromEntries(authResponse.headers.entries()));

    const authResponseText = await authResponse.text();
    console.log('\nAuthentication Response Body:');
    
    let token = null;
    try {
      const authJson = JSON.parse(authResponseText);
      console.log(JSON.stringify(authJson, null, 2));
      
      // Extract token from various possible locations
      token = authJson.token 
        || authJson.accessToken 
        || authJson.access_token
        || authJson.data?.token
        || authJson.result?.token
        || authJson.Data?.token
        || authJson.Result?.token;
      
      if (token) {
        console.log('\n✅ Token found in JSON response!');
        console.log('Token:', token);
        console.log('Token length:', token.length);
        console.log('Token preview:', token.substring(0, 50) + '...');
      } else {
        console.log('\n⚠️  No token found in JSON response.');
        console.log('Response keys:', Object.keys(authJson));
      }
    } catch {
      // If response is not JSON, it might be a plain text token
      if (authResponseText && authResponseText.trim().length > 0) {
        console.log('Response (plain text):', authResponseText);
        token = authResponseText.trim();
        console.log('\n✅ Token (plain text):', token);
        console.log('Token length:', token.length);
        console.log('Token preview:', token.substring(0, 50) + '...');
      } else {
        console.log('Empty response');
      }
    }

    if (!authResponse.ok) {
      console.error('\n❌ Authentication failed with status:', authResponse.status);
    } else {
      console.log('\n✅ Authentication successful!');
      if (token) {
        console.log('\n' + '='.repeat(60));
        console.log('TOKEN RECEIVED:');
        console.log('='.repeat(60));
        console.log('Full Token:', token);
        console.log('Token Length:', token.length);
        console.log('\nYou can now use this token for authenticated API requests.');
        console.log('Add it to headers as: Authorization: Bearer ' + token.substring(0, 20) + '...');
      }
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    console.error('Stack:', error.stack);
  }
};

testRegisterAndAuth();
