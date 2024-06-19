// src/pages/PoliticianPage.tsx
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table, Container } from 'react-bootstrap';
import { getPoliticians, createPolitician, updatePolitician, deletePolitician, getParties } from '../service/apiFacade';

interface Politician {
    id: number;
    firstName: string;
    lastName: string;
    partyId: number;
}

interface Party {
    id: number;
    partyName: string;
}

const PoliticianPage: React.FC = () => {
    const [politicians, setPoliticians] = useState<Politician[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPolitician, setCurrentPolitician] = useState<Politician | null>(null);
    const [newPolitician, setNewPolitician] = useState({ firstName: '', lastName: '', partyId: 0 });
    const [parties, setParties] = useState<Party[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: string }>({ key: '', direction: '' });

    useEffect(() => {
        const fetchData = async () => {
            const politicianData = await getPoliticians();
            const partiesData = await getParties();

            setPoliticians(politicianData);
            setParties(partiesData);
        };

        fetchData();
    }, []);

    const handleShow = (politician: Politician | null) => {
        setCurrentPolitician(politician);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentPolitician(null);
    };

    const handleDelete = async (id: number) => {
        await deletePolitician(id);
        setPoliticians(politicians.filter(politician => politician.id !== id));
    };

    const handleSave = async () => {
        if (currentPolitician) {
            await updatePolitician(currentPolitician.id, currentPolitician);
        } else {
            const created = await createPolitician(newPolitician);
            setPoliticians([...politicians, created]);
        }
        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (currentPolitician) {
            setCurrentPolitician({ ...currentPolitician, [name]: value });
        } else {
            setNewPolitician({ ...newPolitician, [name]: value });
        }
    };

    const sortBy = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    
        const sortedPoliticians = [...politicians];
        sortedPoliticians.sort((a, b) => {
            let aValue, bValue;
            if (key === 'firstName') {
                aValue = a.firstName.toLowerCase();
                bValue = b.firstName.toLowerCase();
            } else if (key === 'partyId') {
                aValue = parties.find(party => party.id === a.partyId)?.partyName || '';
                bValue = parties.find(party => party.id === b.partyId)?.partyName || '';
            }
    
            if (direction === 'ascending') {
                return aValue < bValue ? -1 : 1;
            } else {
                return aValue > bValue ? -1 : 1;
            }
        });
    
        setPoliticians(sortedPoliticians);
    };
        return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Politicians</h1>
            <Button className="mb-3" onClick={() => handleShow(null)}>Add Politician</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => sortBy('firstName')}>Name</th>
                        <th onClick={() => sortBy('partyId')}>Party</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {politicians.map(politician => (
                        <tr key={politician.id}>
                            <td>{politician.firstName} {politician.lastName}</td>
                            <td>{parties.find(party => party.id === politician.partyId)?.partyName}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShow(politician)}>Update</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(politician.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentPolitician ? 'Update Politician' : 'Add Politician'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={currentPolitician ? currentPolitician.firstName : newPolitician.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={currentPolitician ? currentPolitician.lastName : newPolitician.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Party</Form.Label>
                            <Form.Control
                                as="select"
                                name="partyId"
                                value={currentPolitician ? currentPolitician.partyId.toString() : newPolitician.partyId.toString()}
                                onChange={handleChange}
                            >
                                <option value="0">Select Party...</option>
                                {parties.map(party => (
                                    <option key={party.id} value={party.id}>
                                        {party.partyName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{currentPolitician ? 'Save Changes' : 'Add Politician'}</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PoliticianPage;
