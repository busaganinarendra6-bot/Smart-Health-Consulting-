// js/consultation.js
import { saveConsultation } from './api.js';

// ============================================
// SESSION GUARD
// ============================================
const user = localStorage.getItem('user');
if (!user) {
    window.location.href = 'login.html';
}

// ============================================
// PATIENT LIST (Hardcoded to match mockPatients)
// ============================================
const patientList = [
    "Narendra",
    "Awais Ali",
    "Abdul Rahiman",
    "Mohammad Ahmad",
    "Abhiram",
    "Vinay Lal"
];

// ============================================
// POPULATE PATIENT DROPDOWN
// ============================================
function populatePatientDropdown() {
    const select = document.getElementById('patient');
    if (!select) return;

    select.innerHTML = '<option value="">-- Select Patient --</option>';

    patientList.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
}

// ============================================
// SET DEFAULT DATE (Today)
// ============================================
function setDefaultDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
async function handleSubmit(event) {
    event.preventDefault();

    // Get form elements
    const patient = document.getElementById('patient').value;
    const doctor = document.getElementById('doctor').value.trim();
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;
    const diagnosis = document.getElementById('diagnosis').value.trim();
    const prescription = document.getElementById('prescription').value.trim();

    // Validation
    if (!patient) {
        showError('Please select a patient.');
        return;
    }
    if (!doctor) {
        showError('Please enter the doctor\'s name.');
        return;
    }
    if (!date) {
        showError('Please select a date.');
        return;
    }
    if (!diagnosis) {
        showError('Please enter a diagnosis.');
        return;
    }

    // Disable submit button
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    hideMessages();

    const consultationData = {
        patient,
        doctor,
        date,
        status,
        diagnosis,
        prescription
    };

    try {
        const result = await saveConsultation(consultationData);

        if (result.success) {
            showSuccess(`Consultation added successfully! Transaction Hash: ${result.data.hash}`);
            
            const preview = document.getElementById('blockchain-preview');
            const hashDisplay = document.getElementById('tx-hash');
            if (preview && hashDisplay) {
                hashDisplay.textContent = result.data.hash;
                preview.style.display = 'block';
            }

            sessionStorage.setItem('consultationAdded', 'true');

            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Saved Successfully!';
            submitBtn.style.background = '#10b981';

            // FIXED: Correct redirect path to go back to the dashboard in the root folder
            setTimeout(() => {
                window.location.href = './index.html';
            }, 2500);

        } else {
            showError(result.message || 'Failed to save consultation. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Save & Verify on Chain';
        }
    } catch (error) {
        console.error('Submission error:', error);
        showError('Network error. Please check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save & Verify on Chain';
    }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

function showSuccess(message) {
    const el = document.getElementById('success-message');
    const textEl = document.getElementById('success-text');
    if (el && textEl) {
        textEl.textContent = message;
        el.style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
    }
}

function showError(message) {
    const el = document.getElementById('error-message');
    const textEl = document.getElementById('error-text');
    if (el && textEl) {
        textEl.textContent = message;
        el.style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    }
}

function hideMessages() {
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    populatePatientDropdown();
    setDefaultDate();

    const form = document.getElementById('consultation-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});