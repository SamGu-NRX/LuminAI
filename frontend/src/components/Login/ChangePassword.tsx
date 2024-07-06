import { useState } from 'react';
import { auth, updatePassword } from '@/../firebaseConfig';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      // Re-authenticate user if necessary
      await updatePassword(user, newPassword);
      console.log('Password updated');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Current Password"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
