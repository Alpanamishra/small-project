import React, { useEffect, useState } from 'react';
import axios from 'axios';
const containerStyle = {
maxWidth: '800px',
margin: '0 auto',
padding: '20px',
};
const formStyle = {
display: 'flex',
flexDirection: 'column',
marginBottom: '20px',
};
const inputStyle = {
padding: '10px',
marginBottom: '10px',
border: '1px solid #ccc',
borderRadius: '5px',
};
const buttonStyle = {
backgroundColor: '#007bff',
color: '#fff',
padding: '10px 20px',
border: 'none',
borderRadius: '5px',
cursor: 'pointer',
fontSize: '16px',
};
const tableStyle = {
width: '100%',
borderCollapse: 'collapse',
border: '1px solid #ccc', // Add border to the table
};
const thStyle = {
border: '1px solid #ccc', // Add border to table header cells
padding: '10px',
textAlign: 'left',
};
const tdStyle = {
border: '1px solid #ccc', // Add border to table data cells
padding: '10px',
};
const UserDetails = () => {
const [details, setDetails] = useState([]);
const [editDetails, setEditDetails] = useState({ name: '', roll_no: '', total_marks: '', marks_obtained: '' });
const [message, setMessage] = useState('');
useEffect(() => {
fetchDetails();
}, []);
const fetchDetails = async () => {
try {
const response = await axios.post('http://localhost/apicrud/user_details.php', { action: 'get_user_details' });
if (response.data.success) {
setDetails(response.data.details);
setMessage('');
} else {
setMessage(response.data.msg);
}
} catch (error) {
console.error('There was an error!', error);
}
};
const handleInputChange = (e) => {
setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
};
const handleAddOrUpdateUser = async () => {
try {
constresponse = await axios.post('http://localhost/apicrud/add_or_update_user_details.php', editDetails);
if (response.data.success) {
setEditDetails({ name: '', roll_no: '', total_marks: '', marks_obtained: '' });
fetchDetails();
}
} catch (error) {
console.error('There was an error!', error);
}
};
const handleDeleteUser = async (roll_no) => {
try {
const response = await axios.post('http://localhost/apicrud/delete_user_details.php', { roll_no });
if (response.data.success) {
fetchDetails();
} else {
console.error('Failed to delete user');
}
} catch (error) {
console.error('There was an error!', error);
}
};
return (
<div style={containerStyle}>
{message && <p>{message}</p>}
<form style={formStyle}>
<input type="text" name="name" value={editDetails.name} onChange={handleInputChange}
placeholder="Name" style={inputStyle} />
<input type="text" name="roll_no" value={editDetails.roll_no} onChange={handleInputChange}
placeholder="Roll No" style={inputStyle} />
<input type="number" name="total_marks" value={editDetails.total_marks} onChange={handleInputChange}
placeholder="Total Marks" style={inputStyle} />
<input type="number" name="marks_obtained" value={editDetails.marks_obtained}
onChange={handleInputChange} placeholder="Marks Obtained" style={inputStyle} />
<button type="button" onClick={handleAddOrUpdateUser} style={buttonStyle}>
Add or Update User
</button>
</form>
<table style={tableStyle}>
<thead>
<tr>
<th style={thStyle}>Name</th>
<th style={thStyle}>Roll No</th>
<th style={thStyle}>Total Marks</th>
<th style={thStyle}>Marks Obtained</th>
<th style={thStyle}>Percentage</th>
<th style={thStyle}>Action</th>
</tr>
</thead>
<tbody>
{details.map((user, index) => (
<tr key={index}>
<td style={tdStyle}>{user.name}</td>
<td style={tdStyle}>{user.roll_no}</td>
<td style={tdStyle}>{user.total_marks}</td>
<td style={tdStyle}>{user.marks_obtained}</td>
<td style={tdStyle}>{user.percentage}%</td>
<td style={tdStyle}>
<button onClick={() => handleDeleteUser(user.roll_no)} style={{ backgroundColor: '#dc3545', color: '#fff',
border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
};
export default UserDetails;