import { useStore } from "@/AuthProvider"

const OneAdPage=(() => {
   
  const {user} = useStore()
  console.log('OneAdPage', user._isAuth)
      return (
      <>One ad page</>
          
          
      )
    })
    
export default OneAdPage
    