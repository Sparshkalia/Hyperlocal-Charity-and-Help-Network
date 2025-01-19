'useclient';
import { useContext,createContext } from "react";
export const createpost=createContext({
    postcontent:[
        {
            id: "1",
            title: "AIIMS New-Delhi",
            time:"1 hours ago",
            titlelogo:'./slogo.png',
            postimg:'./sample.png',
            discription:"Urgent need of blood!",
        },
    ],
    addpostcontent: (post)=>{},
    updatepostcontent: (post,id)=>{},
    deletepostcontent: (post)=>{},
})
export const usepost=()=>{
    return useContext(createpost);
}
export let Postprovider=createpost.Provider;    