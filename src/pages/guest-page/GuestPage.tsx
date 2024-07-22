import { useStore } from "@/AuthProvider";


const GuestPage = () => {
    const { user }= useStore();
    console.log('GuestPage')
    return (
        <>
        <div>{user.isAuth}</div>
         <p>Guest Page</p>
        </>
        
    )
  }
  
  export default GuestPage
  