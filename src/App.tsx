import React, { useState } from 'react';
import { GameData } from './models/GameData';

const App: React.FC = () => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target!.result as string) as GameData;
      setGameData(jsonData);
      setLoading(false);
    };

    setLoading(true);
    reader.readAsText(file);
  };

  if (loading) return <div>Loading...</div>;
  if (!gameData) return (
    <div>
      <h1>Game Visualization</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <p>JSONファイルをアップロードしてください。</p>
    </div>
  );

  return (
    <div>
      <h1>Game Visualization</h1>
      <h2>Game ID: {gameData.game_id}</h2>
      <h3>Winning Side: {gameData.win_side}</h3>

      <h4>Agents</h4>
      <ul>
        {gameData.agents.map(agent => (
          <li key={agent.idx}>
            <strong>{agent.name}</strong> - {agent.role} ({agent.team})
          </li>
        ))}
      </ul>

      <h4>Entries</h4>
      {gameData.entries.map((entry, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>
            <strong>Agent:</strong> {entry.agent}
          </p>
          <p>
            <strong>Request:</strong> {entry.request.request}
          </p>
          {entry.request.info && (
            <div>
              <h5>Info</h5>
              <ul>
                <li><strong>Day:</strong> {entry.request.info.day}</li>
                <li><strong>Agent:</strong> {entry.request.info.agent}</li>
                {entry.request.info.executedAgent && <li><strong>Executed Agent:</strong> {entry.request.info.executedAgent}</li>}
                {entry.request.info.divineResult && (
                  <li>
                    <strong>Divine Result:</strong> {entry.request.info.divineResult.result} on {entry.request.info.divineResult.target}
                  </li>
                )}
              </ul>
            </div>
          )}
          {entry.request.setting && (
            <div>
              <h5>Setting</h5>
              <ul>
                <li><strong>Max Talk:</strong> {entry.request.setting.maxTalk}</li>
                <li><strong>Max Whisper:</strong> {entry.request.setting.maxWhisper}</li>
                <li><strong>Is Vote Visible:</strong> {entry.request.setting.isVoteVisible ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
