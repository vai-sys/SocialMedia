// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [refresh, setRefresh] = useState(false); 
  
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/users');
//         setUsers(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching users');
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchUsers();
//     }, [refresh]); 
  
//     const handleRefresh = () => {
//       setRefresh(!refresh); 
//     };

//   if (loading) return <div className="text-center mt-8 text-xl">Loading...</div>;
//   if (error) return <div className="text-center mt-8 text-xl text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//         <button
//           onClick={handleRefresh}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
//         >
//           Refresh Data
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
//             <div className=' flex justify-center items-center gap-5 '>
//             <h2 className="text-xl font-semibold mb-2 text-gray-800">{user.username}</h2>
//             <p className="text-gray-600 mb-2">@{user.socialMediaHandle}</p>
//             </div>
//             <h3 className="font-semibold mb-2 text-gray-700"> Files:</h3>
//             <div className="grid grid-cols-3 gap-2">
//               {user.files.map((file, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <img
//                     src={`http://localhost:3000/${file.path}`}
//                     alt={file.originalname}
//                     className="w-16 h-16 object-cover rounded-md shadow-md mb-1"
//                   />
//                   <Link
//                     to={`http://localhost:3000/${file.path}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-xs "
//                   >
//                     View
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RefreshCw, User, Image as ImageIcon } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <p className="text-2xl font-bold text-red-500 mb-4">Oops!</p>
        <p className="text-gray-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Admin Dashboard
          </h1>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Refresh Data
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-10 w-10 text-blue-500" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
                      <p className="text-sm text-gray-500">@{user.socialMediaHandle}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700 mb-3 flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5 text-blue-500" />
                    Files:
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {user.files.map((file, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={`http://localhost:3000/${file.path}`}
                          alt={file.originalname}
                          className="w-full h-24 object-cover rounded-md shadow-md transition duration-300 ease-in-out group-hover:opacity-75"
                        />
                        <Link
                          to={`http://localhost:3000/${file.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white text-sm font-medium"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;