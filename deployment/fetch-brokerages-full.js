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
async function fetchAllBrokerageData() {
  console.log('='.repeat(80));
  console.log('Starting Brokerage Data Fetch');
  console.log('='.repeat(80));
  console.log(`Delay between requests: ${DELAY_MS / 1000} seconds`);
  console.log(`Max retries per request: ${MAX_RETRIES}`);
  console.log('='.repeat(80));
  console.log('');

  const result = {
    brokerages: [],
    details: [],
    branches: [],
    licenses: [],
    pillars: [],
    approvals: [],
    metadata: {
      fetchDate: new Date().toISOString(),
      totalBrokerages: 0,
      totalBranches: 0,
      totalLicenses: 0,
      totalPillars: 0,
      totalApprovals: 0
    }
  };

  try {
    // Step 1: Fetch all brokerages
    console.log('\n' + '='.repeat(80));
    console.log('STEP 1: Fetching all brokerages...');
    console.log('='.repeat(80));
    
    const brokeragesResponse = await fetchWithRetry('/institutes?offset=1&limit=1000&lng=fa&instituteType=9');
    result.brokerages = brokeragesResponse.data || [];
    result.metadata.totalBrokerages = result.brokerages.length;
    
    console.log(`\n✓ Found ${result.brokerages.length} brokerages`);
    console.log('');

    // Step 2: Fetch related data for each brokerage
    console.log('='.repeat(80));
    console.log('STEP 2: Fetching related data for each brokerage...');
    console.log('='.repeat(80));
    console.log('');

    for (let i = 0; i < result.brokerages.length; i++) {
      const brokerage = result.brokerages[i];
      const instituteId = brokerage.Id;
      const progress = `[${i + 1}/${result.brokerages.length}]`;
      
      console.log('-'.repeat(80));
      console.log(`${progress} Processing: ${brokerage.Name} (ID: ${instituteId})`);
      console.log('-'.repeat(80));

      try {
        // Delay before each brokerage (except the first one)
        if (i > 0) {
          await delay(DELAY_MS);
        }

        // Fetch detailed info
        try {
          const details = await fetchWithRetry(`/institutes/${instituteId}?offset=0&limit=1000&lng=fa`);
          if (details) {
            result.details.push({
              instituteId: instituteId,
              ...details
            });
          }
        } catch (err) {
          console.error(`  ⚠ Failed to fetch details for ${instituteId}:`, err.message);
        }

        await delay(DELAY_MS);

        // Fetch branches
        try {
          const branchesResponse = await fetchWithRetry(`/institutes/${instituteId}/branches?offset=1&limit=1000&lng=fa`);
          if (branchesResponse) {
            const branches = Array.isArray(branchesResponse) ? branchesResponse : (branchesResponse.data || []);
            branches.forEach(branch => {
              result.branches.push({
                instituteId: instituteId,
                instituteName: brokerage.Name,
                ...branch
              });
            });
            console.log(`  → Branches: ${branches.length}`);
          }
        } catch (err) {
          console.error(`  ⚠ Failed to fetch branches for ${instituteId}:`, err.message);
        }

        await delay(DELAY_MS);

        // Fetch licenses
        try {
          const licensesResponse = await fetchWithRetry(`/institutes/${instituteId}/licenses?offset=1&limit=1000&lng=fa`);
          if (licensesResponse) {
            const licenses = Array.isArray(licensesResponse) ? licensesResponse : (licensesResponse.data || []);
            licenses.forEach(license => {
              result.licenses.push({
                instituteId: instituteId,
                instituteName: brokerage.Name,
                ...license
              });
            });
            console.log(`  → Licenses: ${licenses.length}`);
          }
        } catch (err) {
          console.error(`  ⚠ Failed to fetch licenses for ${instituteId}:`, err.message);
        }

        await delay(DELAY_MS);

        // Fetch pillars
        try {
          const pillarsResponse = await fetchWithRetry(`/institutes/${instituteId}/pillars?offset=1&limit=1000&lng=fa`);
          if (pillarsResponse) {
            const pillars = Array.isArray(pillarsResponse) ? pillarsResponse : (pillarsResponse.data || []);
            pillars.forEach(pillar => {
              result.pillars.push({
                instituteId: instituteId,
                instituteName: brokerage.Name,
                ...pillar
              });
            });
            console.log(`  → Pillars: ${pillars.length}`);
          }
        } catch (err) {
          console.error(`  ⚠ Failed to fetch pillars for ${instituteId}:`, err.message);
        }

        await delay(DELAY_MS);

        // Fetch online technical approvals
        try {
          const approvalsResponse = await fetchWithRetry(`/institutes/${instituteId}/onlineTechnicalApprovals?offset=1&limit=1000&lng=fa`);
          if (approvalsResponse) {
            const approvals = Array.isArray(approvalsResponse) ? approvalsResponse : (approvalsResponse.data || []);
            approvals.forEach(approval => {
              result.approvals.push({
                instituteId: instituteId,
                instituteName: brokerage.Name,
                ...approval
              });
            });
            console.log(`  → Approvals: ${approvals.length}`);
          }
        } catch (err) {
          console.error(`  ⚠ Failed to fetch approvals for ${instituteId}:`, err.message);
        }

        console.log(`${progress} ✓ Completed: ${brokerage.Name}`);
        console.log('');

      } catch (err) {
        console.error(`${progress} ✗ Error processing ${brokerage.Name}:`, err.message);
        console.log('');
      }
    }

    // Update metadata
    result.metadata.totalBranches = result.branches.length;
    result.metadata.totalLicenses = result.licenses.length;
    result.metadata.totalPillars = result.pillars.length;
    result.metadata.totalApprovals = result.approvals.length;

    // Step 3: Save data
    console.log('='.repeat(80));
    console.log('STEP 3: Saving data...');
    console.log('='.repeat(80));

    // Save main combined file
    const mainFile = 'public/data/brokerages-full.json';
    fs.writeFileSync(mainFile, JSON.stringify(result, null, 2), 'utf8');
    console.log(`✓ Saved: ${mainFile}`);

    // Save individual files
    fs.writeFileSync('public/data/brokerages.json', JSON.stringify({ data: result.brokerages, total: result.brokerages.length }, null, 2), 'utf8');
    console.log('✓ Saved: public/data/brokerages.json');

    fs.writeFileSync('public/data/brokerage-branches.json', JSON.stringify({ data: result.branches, total: result.branches.length }, null, 2), 'utf8');
    console.log('✓ Saved: public/data/brokerage-branches.json');

    fs.writeFileSync('public/data/brokerage-licenses.json', JSON.stringify({ data: result.licenses, total: result.licenses.length }, null, 2), 'utf8');
    console.log('✓ Saved: public/data/brokerage-licenses.json');

    fs.writeFileSync('public/data/brokerage-pillars.json', JSON.stringify({ data: result.pillars, total: result.pillars.length }, null, 2), 'utf8');
    console.log('✓ Saved: public/data/brokerage-pillars.json');

    fs.writeFileSync('public/data/brokerage-approvals.json', JSON.stringify({ data: result.approvals, total: result.approvals.length }, null, 2), 'utf8');
    console.log('✓ Saved: public/data/brokerage-approvals.json');

    // Print summary
    console.log('');
    console.log('='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Brokerages:  ${result.metadata.totalBrokerages}`);
    console.log(`Total Branches:    ${result.metadata.totalBranches}`);
    console.log(`Total Licenses:    ${result.metadata.totalLicenses}`);
    console.log(`Total Pillars:     ${result.metadata.totalPillars}`);
    console.log(`Total Approvals:   ${result.metadata.totalApprovals}`);
    console.log('='.repeat(80));
    console.log('✓ All data fetched and saved successfully!');
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
fetchAllBrokerageData();

