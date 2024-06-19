import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PartiesPage from "./pages/PartiesPage";
import PartyPage from "./pages/PartyPage";
import PoliticianPage from "./pages/PoliticianPage";
import ResultPage from "./pages/ResultPage";

function App() {

  return (
    <>
               <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/parties" element={<PartiesPage />} />
                    <Route path="/politicians" element={<PoliticianPage />} />
                    <Route path="/electionresult" element={<ResultPage />} />
                    <Route path="/party/:id" element={<PartyPage />} />

                </Routes>
            </Layout>
        </>
        
    );

}

export default App
