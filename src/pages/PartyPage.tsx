// src/pages/PartyPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPartyById, getPoliticianByPartyId } from '../service/apiFacade';

interface Party {
    id: number;
    partyName: string;
    partyLetter: string;
}

interface Politician {
    id: number;
    firstName: string;
    lastName: string;
}

const PartyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [party, setParty] = useState<Party | null>(null);
    const [politicians, setPoliticians] = useState<Politician[]>([]);

    useEffect(() => {
        async function fetchData() {
            const partyData = await getPartyById(Number(id));
            setParty(partyData);

            const politiciansData = await getPoliticianByPartyId(Number(id));
            setPoliticians(politiciansData);
        }

        fetchData();
    }, [id]);

    return (
        <div className="container mt-5">
            {party && (
                <>
                    <h1 className="text-center">{party.partyName}</h1>
                    <h3 className="text-center">{party.partyLetter}</h3>
                </>
            )}
            <div className="row mt-4">
                {politicians.map(politician => (
                    <div key={politician.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{politician.firstName} {politician.lastName}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartyPage;
