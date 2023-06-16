import { NextPage } from "next";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { saveAs } from 'file-saver';

const User: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="flex justify-center" >Loading...</div>;
  if (error) return <div className="flex justify-center" >{error.message}</div>;
  if (!user) return <div className="flex justify-center" >You are not logged in</div>

  const downloadResume = () => {
    fetch('api/create-pdf')
    .then(response => response.blob())
    .then(blob => {
        saveAs(blob, `${user.name}-${user.updated_at}.pdf`); 
    })
    .catch(error => {
      console.log(error)
      // Manejo de errores
    });
  }

  return (
    user && (
      <div className="flex justify-center">
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href="/api/auth/logout">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
        </Link>

        <button onClick={() => downloadResume()}>Download resume</button>
      </div>
    )
  );
}

export default User;

//this creates /user  //to show logged user data