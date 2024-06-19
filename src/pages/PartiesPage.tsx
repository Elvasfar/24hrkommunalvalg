// src/pages/PartiesPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParties } from '../service/apiFacade';

interface Party {
    id: number;
    partyName: string;
    partyLetter: string;
}

const PartiesPage: React.FC = () => {
    const [parties, setParties] = useState<Party[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const data = await getParties();
            setParties(data);
        }

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Parties</h1>
            <div className="row mt-4">
                {parties.map(party => (
                    <div key={party.id} className="col-md-4 mb-4">
                        <div className="card" onClick={() => navigate(`/party/${party.id}`)}>
                            <div className="card-body">
                                <h5 className="card-title">{party.partyName}</h5>
                                <p className="card-text">{party.partyLetter}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartiesPage;
