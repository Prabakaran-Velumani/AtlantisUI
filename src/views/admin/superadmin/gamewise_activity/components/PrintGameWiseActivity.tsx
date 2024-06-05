
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameAnswer } from 'utils/activitycontrols/activities';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Values {
  ansObject: { [key: string]: string };
  optionsObject: { [key: string]: string };
  scoreObject: { [key: string]: string | number };
}

interface InteractionBlock {
  block: string;
  values: Values;
  QuestNo:any
};

interface GameData {
  gameTitle: string;
  gameStoryLine: string;
  gameQuestNo: number;
  value: {
    interactionBlocks: InteractionBlock[];
  };
}

const PrintGameWiseActivity: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract id from URL params
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const gameAnswer = async () => {
      try {
        if (id) {
          const result = await getGameAnswer(Number(id));
          setGameData(result);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching game answer:', err);
        setError('Failed to fetch game answer');
        setLoading(false);
      }
    };

    gameAnswer();
  }, [id]);

  // Log data to console
  console.log(gameData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !gameData) {
    return <p>Error: {error || 'No data available'}</p>;
  }

  // Define cell and row styles
  const cellStyle: React.CSSProperties = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left'

  };
  const cellscore: React.CSSProperties = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'right'

  };
  const cellStylee: React.CSSProperties = {
    // border: '1px solid black',
    // boderTop:'1px solid black',
    padding: '8px',
    textAlign: 'center',
    borderTop:'none',
    borderLeft:'1px solid black',
    borderRight:'1px solid black'
  };
  const cellQuestion: React.CSSProperties = {
    // border: '1px solid black',
    // boderTop:'1px solid black',
    padding: '8px',
    textAlign: 'left',
    borderTop:'none',
    borderLeft:'1px solid black',
    borderRight:'1px solid black'
  };
  const cellStyleee: React.CSSProperties = {
    // border: '1px solid black',
    borderBottom:'none',
    borderTop:'1px solid black',
    borderLeft:'1px solid black',
    borderRight:'1px solid black',
    padding: '8px',
    textAlign: 'center'

  };
  const cellicon: React.CSSProperties = {
    // border: '1px solid black',
   
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center'

  };
  const rowStyle: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
    border: '1px solid black',
  };
  const rowStylee: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
    border: '1px solid black',
  };



return (
  <div style={{ fontFamily: 'Arial, sans-serif' }}>
    <>
      <br/>
      <br/>
      <table style={{ borderCollapse: 'collapse', width: '75%' ,marginLeft:"110px",marginRight:"60px" }}>
        <thead>
         
        
          <tr>
            <th colSpan={5} style={{ ...cellStyleee }} >
            {gameData.gameTitle}
            </th>
            
          </tr>
          <tr>
            <th colSpan={5} style={{ ...cellStylee }} >
            {gameData.gameStoryLine}
            </th>
            
          </tr>
          <tr>
            <th style={{ ...cellStyle }}>S.No</th>
            <th style={{ ...cellStyle }}>Interaction</th>
            <th style={{ ...cellStyle }}>No. of Options</th>
            <th style={{ ...cellStyle }}>Right Answer</th>
            <th style={{ ...cellStyle }}>Score</th>
          </tr>
        </thead>
        {/* <tbody>
          {gameData?.value?.interactionBlocks.map((interactionBlock: InteractionBlock, index: number) => {
            // const questno = interactionBlock.length;
            const options = Object.entries(interactionBlock.values.optionsObject);
            const answers = Object.entries(interactionBlock.values.ansObject);
            console.log("answers", answers);
            const scores = Object.entries(interactionBlock.values.scoreObject);
            const oplen = options.length;
            console.log("oplen", oplen);
            console.log("interactionBlock.QuestNo", interactionBlock.QuestNo);
            // Filter out options that have corresponding answers and scores
            const answerKeys = new Set(answers.map(([key]) => key));
            const scoreKeys = new Set(scores.map(([key]) => key));

            const validOptions = options.filter(([optKey]) => answerKeys.has(optKey) && scoreKeys.has(optKey));
            const validOptionsLength = validOptions.length;

            return (
              <React.Fragment key={index}>
                {options.map(([optKey, optValue], optIndex) => {
                  var opans = answers[optIndex];
                  console.log("opans", opans);
                  var opscores = scores[optIndex];
                  return (
                    <React.Fragment key={`${index}-${optIndex}`}>
                      {optIndex === 0 && (
                        <tr style={rowStyle}>
                          <td colSpan={5}>Game Quest No: {interactionBlock.QuestNo}</td>
                        </tr>
                      )}
                      <tr key={`${index}-${optIndex}`} style={rowStyle}>
                        {optIndex === 0 && (
                          <>
                            <td rowSpan={oplen} style={cellStylee}>{index + 1}</td>
                            <td rowSpan={oplen} style={cellQuestion}>{interactionBlock.block}</td>
                          </>
                        )}
                        <td style={cellStyle}>{optValue}</td>
                      

                        <td style={cellicon}>
                          <div style={{ display: 'inline-block' }}>
                            {opans[1] === 'true' ? (
                              <FaCheck style={{ color: 'green' }} />
                            ) : (
                              <FaTimes style={{ color: 'red' }} />
                            )}
                          </div>
                        </td>
                        <td style={cellscore}>
                          <div>{opscores[1]}</div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody> */}
         <tbody>
          {/* {gameData.value.interactionBlocks.map((interactionBlock, index) => (
            <React.Fragment key={index}>
              {Object.entries(interactionBlock.values.ansObject).map(([key, value], ansIndex) => (
                <tr key={`${index}-${ansIndex}`}>
                  {ansIndex === 0 && (
                    <>
                      <td rowSpan={Object.keys(interactionBlock.values.ansObject).length} style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                      <td rowSpan={Object.keys(interactionBlock.values.ansObject).length} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{interactionBlock.block}</td>
                    </>
                  )}
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{key}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                    {value === 'true' ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{interactionBlock.values.scoreObject[key]}</td>
                </tr>
              ))}
            </React.Fragment>
          ))} */}
            {gameData.value.interactionBlocks.map((interactionBlock, index) => (
    <React.Fragment key={index}>
      <tr style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>
        <td colSpan={5}>Game Quest No: {interactionBlock.QuestNo}</td>
      </tr>
      {Object.entries(interactionBlock.values.ansObject).map(([key, value], ansIndex) => (
        <tr key={`${index}-${ansIndex}`}>
          {ansIndex === 0 && (
            <>
              <td rowSpan={Object.keys(interactionBlock.values.ansObject).length} style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td rowSpan={Object.keys(interactionBlock.values.ansObject).length} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{interactionBlock.block}</td>
            </>
          )}
          <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>{interactionBlock.values.optionsObject[key]}</td>
          <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
            {value === 'true' ? (
              <FaCheck style={{ color: 'green' }} />
            ) : (
              <FaTimes style={{ color: 'red' }} />
            )}
          </td>
          <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{interactionBlock.values.scoreObject[key]}</td>
        </tr>
      ))}
    </React.Fragment>
  ))}

        </tbody>
      </table>
    </>
  </div>
);



};

export default PrintGameWiseActivity;

