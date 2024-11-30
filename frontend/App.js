// DOM Elements
const sidebar = document.getElementById('sidebar');
const hamburgerMenu = document.getElementById('hamburger-menu');
const closeSidebar = document.getElementById('close-sidebar');
const overlay = document.getElementById('overlay');
const body = document.body;

// Function to Toggle Sidebar and Overlay
function toggleSidebar(open) {
    if (open) {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        body.classList.add('no-scroll');
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    }
}

// Event Listeners
hamburgerMenu.addEventListener('click', () => toggleSidebar(true));
closeSidebar.addEventListener('click', () => toggleSidebar(false));
overlay.addEventListener('click', () => toggleSidebar(false));


// Sidebar Navigation Functions


// Function to show the Portfolio section
function showPortfolio() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections
  });
  document.getElementById('portfolio').style.display = 'block'; // Show Portfolio
}

// Function to show the Market section
function showMarket() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections
  });
  document.getElementById('market-data').style.display = 'block'; // Show Market Data
}

// Function to show the Trade section
function showTrade() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections
  });
  document.getElementById('trade').style.display = 'block'; // Show Trade
}

// Function to show the Transactions section
function showTransactions() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections
  });
  document.getElementById('transactions').style.display = 'block'; // Show Transactions
}

//function to show deposit method
function showDeposit() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('deposit').style.display = 'block';
}

//function to show withdrawal

function showWithdrawal() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('withdrawal').style.display = 'block';
}

function showSettings() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
      section.style.display = 'none'; // Hide all sections
  });
  document.getElementById('settings').style.display = 'block'; // Show Settings
}


// Attach the functions to the sidebar menu items
document.getElementById('portfolio-menu').addEventListener('click', showPortfolio);
document.getElementById('market-menu').addEventListener('click', showMarket);
document.getElementById('trading-menu').addEventListener('click', showTrade);
document.getElementById('transaction-menu').addEventListener('click', showTransactions);
document.getElementById('settings-menu').addEventListener('click', showSettings);
document.getElementById('settings-menu').addEventListener('click', showSettings);
document.getElementById('deposit-menu').addEventListener('click', showDeposit);
document.getElementById('withdrawal-menu').addEventListener('click', showWithdrawal);

// Initialize the default section
showPortfolio();


// Fetch Market Data Functionality
async function fetchMarketData() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=false';

  try {
      const response = await fetch(url);
      const data = await response.json();

      const marketList = document.getElementById('market-list');
      marketList.innerHTML = ''; // Clear any existing data

      data.forEach(coin => {
          const marketItem = document.createElement('div');
          marketItem.classList.add('market-item');
          marketItem.innerHTML = `
              <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
              <p>Price: $${coin.current_price}</p>
              <button onclick="openTradeModal('${coin.id}', 'buy')">Buy</button>
              <button onclick="openTradeModal('${coin.id}', 'sell')">Sell</button>
          `;
          marketList.appendChild(marketItem);
      });
  } catch (error) {
      console.error("Error fetching market data:", error);
  }
}

fetchMarketData();


//code for custom drop down with icons


document.getElementById('deposit-method').addEventListener('change', function () {
  const method = this.value;
  // Hide all sections
  document.querySelectorAll('#deposit-method-sections .deposit-method-section').forEach(section => {
      section.style.display = 'none';
  });

  // Show the selected section
  if (method) {
      const section = document.getElementById(`${method}-section`);
      if (section) section.style.display = 'block';
  }
});

function copyToClipboard(elementId) {
  const copyText = document.getElementById(elementId);
  navigator.clipboard.writeText(copyText.value).then(() => {
      alert('Copied to clipboard!');
  });
}

// Js code for withdrawal toggle functionality
document.querySelectorAll('.withdrawal-tab').forEach(tab => {
  tab.addEventListener('click', () => {
      document.querySelectorAll('.withdrawal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const method = tab.dataset.method;
      document.querySelectorAll('.withdrawal-method').forEach(methodDiv => {
          methodDiv.style.display = methodDiv.id === `${method}-method` ? 'block' : 'none';
      });
  });
});


function copyToClipboard(elementId) {
  const input = document.getElementById(elementId);
  input.select();
  document.execCommand("copy");
  alert("Copied to clipboard: " + input.value);
}

// Redirect to Support Email Function
function redirectToSupportEmail() {
  const supportEmail = "support@example.com";
  const subject = "Request for Credit/Debit Card Deposit Instructions";
  const body = `Hello,\n\nI would like to deposit funds using my credit or debit card. Please provide me with the necessary instructions to complete the transaction.\n\nThank you!`;

  // Construct the mailto link
  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Redirect to the mailto link
  window.location.href = mailtoLink;
}


// Redirect to Email Support Function this is for the email 
function redirectToEmailDepositSupport() {
  const supportEmail = "support@example.com";
  const subject = "Request for Deposit Instructions via Email";
  const body = `Hello,\n\nI would like to deposit funds using the 'Deposit through Email' method. Please provide me with the necessary details to complete the transaction.\n\nThank you!`;

  // Construct the mailto link
  const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Redirect to the mailto link
  window.location.href = mailtoLink;
}


// Fetch deposit details from the backend when the page loads
window.addEventListener('DOMContentLoaded', () => {
  fetch('/api/deposit-details')
      .then(response => response.json())
      .then(data => {
          if (data) {
              // Save the data to a global variable or state for later use
              window.depositData = data;
          }
      })
      .catch(error => console.error('Error fetching deposit data:', error));
});

document.getElementById('deposit-method').addEventListener('change', function () {
const method = this.value;
const depositData = window.depositData;

// Hide all sections
document.querySelectorAll('#deposit-method-sections .deposit-method-section').forEach(section => {
    section.style.display = 'none';
});

// Show the selected section and populate with data
if (method) {
    const section = document.getElementById(`${method}-section`);
    if (section) {
        section.style.display = 'block';

        // Bank Transfer Details
        if (method === 'bank-transfer') {
            document.getElementById('bank-name').value = depositData.bankDetails.bankName || '';
            document.getElementById('routing-number').value = depositData.bankDetails.routingNumber || '';
            document.getElementById('account-number').value = depositData.bankDetails.accountNumber || '';
            document.getElementById('account-name').value = depositData.bankDetails.accountName || '';
            document.getElementById('swift-code').value = depositData.bankDetails.swiftCode || '';
        }

        // Cryptocurrency Details
        if (method === 'cryptocurrency') {
          const cryptoType = document.getElementById('crypto-type').value;
          const cryptoDetails = depositData.cryptoDetails.find(crypto => crypto.type === cryptoType);
      
          if (cryptoDetails) {
              document.getElementById('crypto-wallet').value = cryptoDetails.walletAddress;
              document.getElementById('crypto-network').value = cryptoDetails.network;
          } else {
              document.getElementById('crypto-wallet').value = 'Select a cryptocurrency to see the wallet address';
              document.getElementById('crypto-network').value = 'Select a cryptocurrency to see the network';
          }
      }
      

        // Digital Wallet Details
        if (method === 'digital-wallet') {
          const walletType = document.getElementById('wallet-type').value;
          const walletDetails = depositData.digitalWalletDetails.find(wallet => wallet.type === walletType);
      
          if (walletDetails) {
              document.getElementById('wallet-info').value = walletDetails.details;
          } else {
              document.getElementById('wallet-info').value = 'Select a wallet to see the details';
          }
      }
      
    }
}
});
