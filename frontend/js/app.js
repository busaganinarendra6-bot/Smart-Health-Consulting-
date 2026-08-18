// js/app.js
import { getDashboardData } from './api.js';

// ============================================
// SESSION GUARD: Protect the dashboard
// ============================================
const user = localStorage.getItem('user');
if (!user) {
    window.location.href = 'pages/login.html';
}

// ============================================
// RENDER FUNCTIONS
// ============================================

// 1. RENDER STATISTICS CARDS
function renderStats(stats) {
    document.getElementById('stat-patients').innerText = stats.totalPatients;
    document.getElementById('stat-consultations').innerText = stats.todayConsultations;
    document.getElementById('stat-pending').innerText = stats.pendingReports;
    document.getElementById('stat-blockchain').innerText = stats.blockchainTx;
}

// 2. RENDER THE TABLE (with clickable rows)
function renderTable(consultations) {
    const tableBody = document.getElementById('consultation-table-body');
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    // Map patient names to their IDs (must match mockPatients in api.js)
    const patientIdMap = {
        "Narendra": 1,
        "Awais Ali": 2,
        "Abdul Rahiman": 3,
        "Mohammad Ahmad": 4,
        "Abhiram": 5,
        "Vinay Lal": 6
    };

    // Loop through data and create rows
    consultations.forEach(record => {
        const row = document.createElement('tr');
        
        // Get the patient ID from the map
        const patientId = patientIdMap[record.patient] || 1;
        row.setAttribute('data-id', patientId);
        row.style.cursor = 'pointer';

        // Map status to CSS class
        let statusClass = 'completed';
        if (record.status === 'Pending') statusClass = 'pending';
        else if (record.status === 'Under Review') statusClass = 'review';

        row.innerHTML = `
            <td><span class="patient-name">${record.patient}</span></td>
            <td>${record.doctor}</td>
            <td>${record.date}</td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
            <td><span class="hash-preview">${record.hash}</span></td>
        `;

        // Click event to redirect to detail page
        row.addEventListener('click', () => {
            window.location.href = `pages/patient-detail.html?id=${patientId}`;
        });

        tableBody.appendChild(row);
    });
}

// 3. RENDER BLOCKCHAIN WIDGET
function renderChainStatus(chain) {
    if (document.getElementById('chain-network')) {
        document.getElementById('chain-network').innerText = chain.network;
        document.getElementById('chain-block').innerText = chain.lastBlock;
        document.getElementById('chain-gas').innerText = chain.gasFee;
        document.getElementById('chain-nodes').innerText = chain.nodes;
    }
}

// 4. MAIN INITIALIZATION
async function initDashboard() {
    try {
        console.log("Loading dashboard data...");
        
                // Check if we just added a new consultation (flag set in consultation.js)
        const shouldRefresh = sessionStorage.getItem('consultationAdded');
        if (shouldRefresh) {
            sessionStorage.removeItem('consultationAdded');
            // Force a fresh fetch (bypass cache if needed)
        }

        const data = await getDashboardData();
        
        renderStats(data.stats);
        renderTable(data.recentConsultations);
        renderChainStatus(data.chainStatus);
        
        console.log("Dashboard rendered successfully!");
    } catch (error) {
        console.error("Failed to load dashboard:", error);
        alert("Could not load data. Please refresh.");
    }
}

// ============================================
// RUN WHEN PAGE LOADS
// ============================================
document.addEventListener('DOMContentLoaded', initDashboard);