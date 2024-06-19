const endpoint = "http://localhost:8080";

interface Politician {
    id: number;
    firstname: string;
    lastname: string;
    partyId: number;   
}


// --------- PARTIES --------- //

async function getParties() {
    const url = `${endpoint}/api/parties`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Products:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

async function getPartyById(id: number) {
    const url = `${endpoint}/api/parties/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Product:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

// ---------- POLITICIANS ---------- //

async function getPoliticians() {
    const url = `${endpoint}/api/politicians`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Products:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

async function getPoliticianById(id: number) {
    const url = `${endpoint}/api/politicians/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Product:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

async function getPoliticianByPartyId(id: number) {
    const url = `${endpoint}/api/politicians/party/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Product:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

async function updatePolitician(id: number, politician: Politician) {
    const url = `${endpoint}/api/politicians/${id}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(politician),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Updated product:", data);
        return data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

async function createPolitician(politician: Politician) {
    const url = `${endpoint}/api/politicians`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(politician),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Created product:", data);
        return data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

async function deletePolitician(id: number) {
    const url = `${endpoint}/api/politicians/${id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // console.log("Deleted product:", id);
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

// -------------VOTES------------- //

async function getVotes() {
    const url = `${endpoint}/api/votes`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Products:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export { getParties, getPartyById, getPoliticians, getPoliticianById, getPoliticianByPartyId, updatePolitician, createPolitician, deletePolitician, getVotes };