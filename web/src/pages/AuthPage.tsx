import { useEffect, useContext, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { Logo } from "../components/Logo";
import { supabase } from "../supabaseClient";
import { UserContext } from "../hooks/UserContext";
import { Loading } from "../components/Loading/Loading";

export function AuthPage() {

    const { user, setUser } = useContext(UserContext);
    const [isLoadingActive, setIsloadingActive] = useState(false);

    const getUserFromDB = async (userEmail: string) => {
        let matchUser = ''
        return await supabase
        .from('user')
        .select('*')
        .then(({ data }) => {
            data?.forEach((userOnDatabase) => (
                userOnDatabase.email == userEmail ? matchUser = userOnDatabase : ''
            ))

            return matchUser;
          });
        ;
    };

    const handleCallbackResponse = async (response: any) => {
        setIsloadingActive(true);
        var userObject: any = jwt_decode(response.credential);
        
        let userFromDb: any = await getUserFromDB(userObject.email);

        userFromDb !== undefined && userFromDb !== '' ?
         setUser(JSON.stringify(userFromDb)) 
         : 
        await supabase
        .from('user')
        .insert({
            name: userObject.name,
            email: userObject.email,
            pictureUrl: userObject.pictureUrl,
            tasklists: [
                {
                    name: "My day",
                    tasks: [
                        {
                        name: "first task",
                        createdAt: new Date(),
                        completed: false,
                    }
                ]
                }
            ],
        })

        userFromDb = await getUserFromDB(userObject.email);
        let newUserFromDb = {
            name: userFromDb.name,
            email: userFromDb.email,
            pictureUrl: userFromDb.pictureUrl
        }
        newUserFromDb !== undefined  ?
         setUser(JSON.stringify(newUserFromDb)) 
         :
         console.log('could not log in')

        setIsloadingActive(false);
    };

    useEffect(() => {
        /* global google */
        // @ts-ignore
        google.accounts.id.initialize({
            client_id: "635718201896-1v05hgpg57pj74e9709e6qh92ram5284.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        // @ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
        // @ts-ignore
        google.accounts.id.prompt();

    }, []);

    return (
        <div className="flex w-screen h-screen flex-col items-center bg-ctp-base justify-center">
            <Logo />
            <h2 className="text-ctp-subtext1 pb-4 font-semibold text-lg">Login to start creating tasks!</h2>
            <div className="flex items-center justify-center p-4">
                <Loading active={isLoadingActive} />
            </div>
            
            <div id="signInDiv"></div>
        </div>
    );
};