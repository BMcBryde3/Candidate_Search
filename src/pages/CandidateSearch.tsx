import { useState, useEffect } from 'react';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    console.log('fetchCandidate');
    setIsLoading(true);
    setError(null);
    try {
      const candidates = await searchGithub();
      console.log('candidates', candidates);
      if (!Array.isArray(candidates) || candidates.length === 0) {
        setError("No candidates available or invalid API response.");
        setIsLoading(false);
        return;
      }

      const login = candidates[0].login;

      console.log('login', login);  

      try {
        const candidateData = await searchGithubUser(login);
        const {location, email, company, bio, avatar_url} = candidateData;
        setCandidate({login, name: candidateData.name, location, email, company, bio, avatar_url});
        console.log(setCandidate);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setError(`Candidate with username ${candidates[0].login} not found.`);
        } else {
          setError("An error occurred while fetching the candidate.");
        }
      }
    } catch (error: any) {
      setError("An error occurred while fetching the candidate.");
    } finally {
      setIsLoading(false);
    }
  };

  const rejectCandidate = () => {
    fetchCandidate();
  };  

  const saveCandidate = () => {
    if (!candidate) return;

    const savedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    fetchCandidate();
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (

    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center text-white">
      <h1 className="mb-4 text-center text-white">Candidate Search</h1>
      {/* Error or Loading */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Candidate Card */}
      {candidate && (
        <div className="card text-left">
          <img src={candidate.avatar_url} className="card-img-top" alt={`${candidate.name}'s avatar`} />
          <div className="card-body">
              <h5 className="card-title">
              <span className="fw-bold"> {candidate.name}</span> <span className="fw-bold">({candidate.login})</span>
            </h5>
            <p className="card-text">
              <strong>Location:</strong> {candidate.location || "No location available."}
            </p>
            <p className="card-text">
              <strong>Email:</strong>{" "}{candidate.email ? (
                <a href={`mailto:${candidate.email}`} className="text-info"> {candidate.email}</a>) : ("No email available.")}
            </p>
            <p className="card-text">
              <strong>Company:</strong> {candidate.company || "No company available."}
            </p>
            <p className="card-text">
              <strong>Bio:</strong> {candidate.bio || "No bio available."}
            </p>
          </div>
        </div>
      )}
      {candidate && (
        <div className="d-flex mt-4" >
          <IoRemoveCircle  style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(255, 0, 0)'}} onClick={() => rejectCandidate?.()} />
          <IoAddCircle style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(0, 255, 123)'}} onClick={() => saveCandidate?.()} />
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;