interface Teammate {
  firstname: string;
  lastname: string;
}

interface MyTeamProps {
  total: number;
  teammates: Teammate[];
}

export default function MyTeam({ total, teammates }: MyTeamProps) {
  const hasTeammateData: boolean = !!teammates;

  function Teammates({ teammateData }) {
    return (
      <>
        <div>
          <h2>My Team</h2>
          <ul>
            {teammateData.map((teammate, idx) => (
              <li key={idx}>
                {teammate.firstname} {teammate.lastname}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return (
    <div>
      <div>
        {hasTeammateData && <Teammates teammateData={teammates} />}
        {!hasTeammateData && <h2>No teammates found</h2>}
      </div>
    </div>
  );
}
