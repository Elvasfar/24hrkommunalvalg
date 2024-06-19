// src/pages/ResultPage.tsx
import React, { useEffect, useState } from 'react';
import { getVotes, getParties, getPoliticians } from '../service/apiFacade';
import { Table, Container } from 'react-bootstrap';

interface Vote {
    id: number;
    politicianId: number | null;
    partyId: number | null;
}

interface Party {
    id: number;
    partyName: string;
}

interface Politician {
    id: number;
    firstname: string;
    lastname: string;
    partyId: number;
}

const ResultPage: React.FC = () => {
    const [votes, setVotes] = useState<Vote[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [politicians, setPoliticians] = useState<Politician[]>([]);
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [votesData, partiesData, politiciansData] = await Promise.all([
                    getVotes(),
                    getParties(),
                    getPoliticians()
                ]);

                setVotes(votesData);
                setParties(partiesData);
                setPoliticians(politiciansData);

                calculateResults(votesData, partiesData, politiciansData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateResults = (votes: Vote[], parties: Party[], politicians: Politician[]) => {
        const partyVoteCount: { [key: number]: number } = {};
        const totalVotes = votes.length;

        votes.forEach(vote => {
            const partyId = vote.partyId || (vote.politicianId && politicians.find(p => p.id === vote.politicianId)?.partyId);
            if (partyId) {
                if (!partyVoteCount[partyId]) {
                    partyVoteCount[partyId] = 0;
                }
                partyVoteCount[partyId]++;
            }
        });

        const resultsData = parties.map(party => {
            const voteCount = partyVoteCount[party.id] || 0;
            const votePercentage = totalVotes ? (voteCount / totalVotes * 100).toFixed(2) : 0;
            return {
                id: party.id, // Add the id here to use as the key
                name: party.partyName,
                voteCount,
                votePercentage,
            };
        });

        setResults(resultsData);
    };

    return (
        <Container>
            <h1 className="mt-4">Valgresultat</h1>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Partier</th>
                        <th>Antal Stemmer</th>
                        <th>i %</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.id}><td>{result.name}</td><td>{result.voteCount}</td><td>{result.votePercentage}%</td></tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ResultPage;
