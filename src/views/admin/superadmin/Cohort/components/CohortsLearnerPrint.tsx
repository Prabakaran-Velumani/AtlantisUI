


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { cohortsLearnerAllDatas } from 'utils/leaner/leaner'; // Adjust the import path as needed

// // Define types for the learner
// interface Learner {
//   email: string;
//   username: string;
//   companyName: string;
// }

// const CohortsLearnerPrint: React.FC = () => {
//   const { id } = useParams(); // Extract id from URL parameters
//   const [learnerDetails, setLearnerDetails] = useState<Learner[]>([]);
//   const [cohortsName, setCohortsName] = useState<string>('');

//   const fetchLearnerDetails = async () => {
//     try {
//       if (id) {
//         const result = await cohortsLearnerAllDatas(id);
//         // Ensure result.learners is an array
//         if (result && Array.isArray(result.learners)) {
//           setLearnerDetails(result.learners);
//           setCohortsName(result.cohortsName);
//         } else {
//           console.error('Expected an array of learners but got:', result);
//           setLearnerDetails([]);
//         }
//       }
//     } catch (err) {
//       console.error('Error fetching learner details:', err);
//       setLearnerDetails([]);
//     }
//   };

//   useEffect(() => {
//     fetchLearnerDetails();
//   }, [id]);

//   return (
//     <div style={{ margin: '0 80px' }}>
//       <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', marginTop: '70px' }}>
//         <thead>
//           <tr>
//             <th colSpan={4} align='left' >
//               <h1 >Cohorts Name: {cohortsName}</h1>
//             </th>
//           </tr>
//           <tr>
//             <th style={{ border: '1px solid black', padding: '8px' }}>S.no</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Learner Name</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Learner Email</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Company Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {learnerDetails.map((learner, index) => (
//             <tr key={index}>
//               <td style={{ border: '1px solid black', padding: '8px', textAlign:'center' }}>{index + 1}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{learner.username}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{learner.email}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{learner.companyName}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CohortsLearnerPrint;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cohortsLearnerAllDatas } from 'utils/cohorts/cohorts'; // Adjust the import path as needed

// Define types for the learner
interface Learner {
  email: string;
  username: string;
  companyName: string;
}

const CohortsLearnerPrint: React.FC = () => {
  const { id } = useParams(); // Extract id from URL parameters
  const [learnerDetails, setLearnerDetails] = useState<Learner[]>([]);
  const [cohortsName, setCohortsName] = useState<string>('');

  const fetchLearnerDetails = async () => {
    try {
      if (id) {
        const result = await cohortsLearnerAllDatas(id);
        // Ensure result.learners is an array
        if (result && Array.isArray(result.learners)) {
          setLearnerDetails(result.learners);
          setCohortsName(result.cohortsName);
        } else {
          console.error('Expected an array of learners but got:', result);
          setLearnerDetails([]);
        }
      }
    } catch (err) {
      console.error('Error fetching learner details:', err);
      setLearnerDetails([]);
    }
  };

  useEffect(() => {
    fetchLearnerDetails();
  }, [id]);

  return (
    <div style={{ margin: '0 80px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', marginTop: '70px' }}>
        <thead>
          <tr>
            <th colSpan={4} align='left' >
              <h1 >Cohorts Name: {cohortsName}</h1>
            </th>
          </tr>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>S.no</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Learner Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Learner Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {learnerDetails.map((learner, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign:'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{learner.username}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{learner.email}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{learner.companyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CohortsLearnerPrint;
