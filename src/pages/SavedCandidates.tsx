
import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(candidates);

  }, []);

  const deleteCandidate = (login: string) => {
    const updatedCandidates = candidates.filter(
      (candidate) => candidate.login !== login
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-white">Saved Candidates</h1>
      {candidates.length === 0 ? (
        <p className="text-center">No saved candidates yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Email</th>
                <th scope="col">Company</th>
                <th scope="col">Bio</th>
                <th scope="col">Reject</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.login}>
                  <td>
                    <img
                      src={candidate.avatar_url}
                      alt={`${candidate.name}'s avatar`}
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{candidate.login}</td>
                  <td>{candidate.location || "No location available."}</td>
                  <td style={{ wordWrap: "break-word", maxWidth: "200px" }}>
                    <a href={`mailto:${candidate.email}`} className="text-decoration-none">
                      {candidate.email || "No email available."}
                    </a>
                  </td>
                  <td>{candidate.company || "No company available."}</td>
                  <td>{candidate.bio || "No bio available."}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCandidate(candidate.login)}
                    >
                      <i className="bi bi-trash"></i> <strong>DELETE</strong>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default SavedCandidates;