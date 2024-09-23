import { linkWithGoogle, linkWithDiscord } from '../../firebaseConfig';

const LinkAccounts = () => {
  return (
    <div className="link-accounts-container">
      <h1>Link Accounts</h1>
      <button onClick={linkWithGoogle}>Link with Google</button>
      <button onClick={linkWithDiscord}>Link with Discord</button>
    </div>
  );
};

export default LinkAccounts;
