// js/api.js
// ============================================
// CONFIG: Toggle between Mock and Real Backend
// ============================================
const USE_MOCK = true; // <-- SET TO 'false' WHEN BACKEND IS READY
const API_BASE_URL = "http://localhost:5000/api"; // Your friend's Flask/FastAPI URL

// ============================================
// MOCK DATA (Looks exactly like a real backend response)
// ============================================
const mockDashboardData = {
    status: "success",
    data: {
        stats: {
            totalPatients: 6,
            todayConsultations: 48,
            pendingReports: 12,
            blockchainTx: 2456,
            trends: {
                patients: "+12%",
                consultations: "+8%",
                pending: "-3%",
            }
        },
        recentConsultations: [
            { patient: "Narendra", doctor: "Dr. Lee", date: "2026-08-16", status: "Completed", hash: "0x7f9e...abc1" },
            { patient: "Awais Ali", doctor: "Dr. Patel", date: "2026-08-16", status: "Pending", hash: "0x3a2b...d4e5" },
            { patient: "Abdul Rahiman", doctor: "Dr. Smith", date: "2026-08-15", status: "Completed", hash: "0xb8c9...f6a2" },
            { patient: "Mohammad Ahmad", doctor: "Dr. Okafor", date: "2026-08-15", status: "Under Review", hash: "0xe4d1...a9c3" },
            { patient: "Abhiram", doctor: "Dr. Gupta", date: "2026-08-14", status: "Completed", hash: "0x1a2b...c3d4" },
            { patient: "Vinay Lal", doctor: "Dr. Fernandez", date: "2026-08-13", status: "Completed", hash: "0x5e6f...g7h8" }
        ],
        chainStatus: {
            network: "Ethereum (Sepolia)",
            lastBlock: "#4,203,891",
            gasFee: "Low (18 Gwei)",
            nodes: "6/6 Synced"
        }
    }
};

// ============================================
// MOCK DATA: Individual Patients (FULLY UPDATED)
// ============================================
const mockPatients = {
    1: {
        id: 1,
        name: "Narendra",
        age: 22,
        gender: "Male",
        bloodType: "O+",
        email: "narendra786@gmail.com",
        phone: "+91 6281258740",
        address: "Lb Nagar, Hyderabad",
        emergencyContact: "Priya (Sister) - +91 9876543210",
        conditions: ["Hypertension", "Migraine"],
        allergies: ["Penicillin"],
        medicalHistory: [
            { date: "2026-08-10", doctor: "Dr. Lee", diagnosis: "Hypertension checkup", prescription: "Lisinopril 10mg", hash: "0x7f9e...abc1" },
            { date: "2026-07-22", doctor: "Dr. Patel", diagnosis: "Annual physical", prescription: "None", hash: "0x3a2b...d4e5" }
        ]
    },
    2: {
        id: 2,
        name: "Awais Ali",
        age: 21,
        gender: "Male",
        bloodType: "A+",
        email: "awaisali123@gmail.com",
        phone: "+91 9293183734",
        address: "Chandrayangutta, Hyderabad",
        emergencyContact: "Fatima (Mother) - +91 9876543211",
        conditions: ["Asthma", "Seasonal Allergies"],
        allergies: ["Dust", "Pollen"],
        medicalHistory: [
            { date: "2026-08-16", doctor: "Dr. Patel", diagnosis: "Asthma follow-up", prescription: "Albuterol inhaler", hash: "0x3a2b...d4e5" },
            { date: "2026-07-30", doctor: "Dr. Okafor", diagnosis: "Allergy test", prescription: "Cetirizine 10mg", hash: "0x1a2b...c3d4" }
        ]
    },
    3: {
        id: 3,
        name: "Abdul Rahiman",
        age: 23,
        gender: "Male",
        bloodType: "B+",
        email: "abdulrahiman456@gmail.com",
        phone: "+91 9182672228",
        address: "Moosarambagh, Hyderabad",
        emergencyContact: "Sara (Wife) - +91 9876543212",
        conditions: ["Type 2 Diabetes", "High Cholesterol"],
        allergies: ["Sulfa"],
        medicalHistory: [
            { date: "2026-08-15", doctor: "Dr. Smith", diagnosis: "Diabetes management", prescription: "Metformin 500mg", hash: "0xb8c9...f6a2" },
            { date: "2026-07-10", doctor: "Dr. Gupta", diagnosis: "Lipid profile", prescription: "Atorvastatin 20mg", hash: "0x9i0j...k1l2" }
        ]
    },
    4: {
        id: 4,
        name: "Mohammad Ahmad",
        age: 20,
        gender: "Male",
        bloodType: "AB+",
        email: "mohammadahmad789@gmail.com",
        phone: "+91 9059135786",
        address: "Kompally, Hyderabad",
        emergencyContact: "Aisha (Daughter) - +91 9876543213",
        conditions: ["Arthritis", "Gout"],
        allergies: ["Aspirin"],
        medicalHistory: [
            { date: "2026-08-15", doctor: "Dr. Okafor", diagnosis: "Joint pain management", prescription: "Allopurinol 100mg", hash: "0xe4d1...a9c3" },
            { date: "2026-06-28", doctor: "Dr. Lee", diagnosis: "Routine blood work", prescription: "None", hash: "0x7q8r...s9t0" }
        ]
    },
    5: {
        id: 5,
        name: "Abhiram",
        age: 19,
        gender: "Male",
        bloodType: "O-",
        email: "abhiram321@gmail.com",
        phone: "+91 7893047236",
        address: "Gowrelly, Hyderabad",
        emergencyContact: "Ravi (Brother) - +91 9876543214",
        conditions: ["None"],
        allergies: ["Peanuts"],
        medicalHistory: [
            { date: "2026-08-14", doctor: "Dr. Gupta", diagnosis: "Physical exam", prescription: "None", hash: "0x1a2b...c3d4" },
            { date: "2026-07-05", doctor: "Dr. Smith", diagnosis: "Allergy consultation", prescription: "Epinephrine pen", hash: "0x5e6f...g7h8" }
        ]
    },
    6: {
        id: 6,
        name: "Vinay Lal",
        age: 22,
        gender: "Male",
        bloodType: "A-",
        email: "vinaylal654@gmail.com",
        phone: "+91 9110362650",
        address: "Moosarambagh, Hyderabad",
        emergencyContact: "Anita (Wife) - +91 9876543215",
        conditions: ["Hypertension", "Sleep Apnea"],
        allergies: ["Latex"],
        medicalHistory: [
            { date: "2026-08-13", doctor: "Dr. Fernandez", diagnosis: "Blood pressure check", prescription: "Amlodipine 5mg", hash: "0x5e6f...g7h8" },
            { date: "2026-07-18", doctor: "Dr. Patel", diagnosis: "Sleep study", prescription: "CPAP machine", hash: "0x9i0j...k1l2" }
        ]
    }
};

// ============================================
// PUBLIC API FUNCTIONS
// ============================================

/**
 * Fetches the dashboard data (Stats + Recent Table)
 */
export async function getDashboardData() {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockDashboardData.data;
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch dashboard');
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error("Backend error, falling back to mock:", error);
            return mockDashboardData.data;
        }
    }
}

/**
 * Fetch a single patient by ID
 */
export async function getPatientById(id) {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 400));
        const patient = mockPatients[id];
        if (patient) {
            return { success: true, data: patient };
        } else {
            return { success: false, message: "Patient not found" };
        }
    } else {
        try {
            const response = await fetch(`${API_BASE_URL}/patients/${id}`);
            if (!response.ok) throw new Error('Patient not found');
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Backend error, falling back to mock:", error);
            const patient = mockPatients[id];
            return patient ? { success: true, data: patient } : { success: false, message: "Patient not found" };
        }
    }
}

/**
 * Mock Login function
 */
export async function loginUser(email, password) {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (email.includes('@') && password.length >= 4) {
            return { success: true, user: { name: "Frontend Dev", role: "Admin" } };
        } else {
            return { success: false, message: "Invalid email or password." };
        }
    } else {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
}
// ============================================
// NEW FUNCTION: Save a new consultation
// ============================================
// We'll store consultations in memory (mock)
let mockConsultations = []; // Will hold newly added ones

export async function saveConsultation(data) {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay

        // Create a new consultation object with a mock hash
        const newConsultation = {
            patient: data.patient,
            doctor: data.doctor,
            date: data.date,
            status: "Pending", // New consultations start as Pending
            hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
        };

        // Store it in memory
        mockConsultations.push(newConsultation);

        // Also add it to the mockDashboardData so the dashboard picks it up
        // We'll prepend it so it shows as "Recent"
        mockDashboardData.data.recentConsultations.unshift(newConsultation);

        // Update the stats (increase today's consultations by 1)
        mockDashboardData.data.stats.todayConsultations += 1;
        mockDashboardData.data.stats.totalPatients += 1; // Simulating a new patient record

        return { 
            success: true, 
            message: "Consultation added successfully!",
            data: newConsultation 
        };
    } else {
        // REAL BACKEND CALL
        try {
            const response = await fetch(`${API_BASE_URL}/consultations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to save consultation');
            return await response.json();
        } catch (error) {
            console.error("Backend error:", error);
            return { success: false, message: error.message };
        }
    }
}