const https = require('https');
const fs = require('fs');

// Configuration
const BASE_URL = 'cfi.rbcapi.ir';
const DELAY_MS = 3000; // 3 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000; // 5 seconds for retry

// Utility function to make HTTPS requests with retry
async function fetchWithRetry(path, retryCount = 0) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      path: path,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    };

    console.log(`Fetching: ${path} (Attempt ${retryCount + 1}/${MAX_RETRIES + 1})`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            console.log(`✓ Success: ${path}`);
            resolve(jsonData);
          } catch (err) {
            console.error(`✗ JSON Parse Error: ${path}`, err.message);
            if (retryCount < MAX_RETRIES) {
              console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
              setTimeout(() => {
                fetchWithRetry(path, retryCount + 1).then(resolve).catch(reject);
              }, RETRY_DELAY_MS);
            } else {
              reject(new Error(`Failed to parse JSON after ${MAX_RETRIES + 1} attempts`));
            }
          }
        } else {
          console.error(`✗ HTTP Error: ${path} - Status: ${res.statusCode}`);
          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
            setTimeout(() => {
              fetchWithRetry(path, retryCount + 1).then(resolve).catch(reject);
            }, RETRY_DELAY_MS);
          } else {
            reject(new Error(`HTTP ${res.statusCode} after ${MAX_RETRIES + 1} attempts`));
          }
        }
      });
    });

    req.on('error', (err) => {
      console.error(`✗ Request Error: ${path}`, err.message);
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
        setTimeout(() => {
          fetchWithRetry(path, retryCount + 1).then(resolve).catch(reject);
        }, RETRY_DELAY_MS);
      } else {
        reject(err);
      }
    });

    req.end();
  });
}

// Utility function to delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function fetchAllInvestmentFundData() {
  console.log('='.repeat(80));
  console.log('Starting Investment Fund Data Fetch');
  console.log('='.repeat(80));
  console.log('');

  try {
    // Fetch all investment funds
    console.log('Fetching investment funds from API...');
    console.log('Endpoint: /institutes?offset=1&limit=1000&lng=fa&instituteType=6');
    console.log('');
    
    const fundsResponse = await fetchWithRetry('/institutes?offset=1&limit=1000&lng=fa&instituteType=6');
    const investmentFunds = fundsResponse.data || [];
    
    console.log(`✓ Successfully fetched ${investmentFunds.length} investment funds`);
    console.log('');

    // Save data
    console.log('='.repeat(80));
    console.log('Saving data files...');
    console.log('='.repeat(80));

    // Save main investment funds file
    fs.writeFileSync('public/data/investment-funds.json', JSON.stringify({ data: investmentFunds, total: investmentFunds.length }, null, 2), 'utf8');
    console.log('✓ Saved: public/data/investment-funds.json');

    // Print summary
    console.log('');
    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Investment Funds: ${investmentFunds.length}`);
    console.log(`Fetch Date: ${new Date().toISOString()}`);
    console.log('='.repeat(80));
    console.log('✓ Investment fund data fetched and saved successfully!');
    console.log('='.repeat(80));

  } catch (err) {
    console.error('');
    console.error('='.repeat(80));
    console.error('FATAL ERROR');
    console.error('='.repeat(80));
    console.error(err);
    console.error('='.repeat(80));
    process.exit(1);
  }
}

// Run the script
fetchAllInvestmentFundData();

