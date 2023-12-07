import { useEffect, useState } from "react";

const UserProfile = ({token}:any) => {
   
    const [user,setUser] = useState()
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        if(token)
        {

            getUserInfo(token)
        }
    
     
    }, [])
    console.log(user)

    const getUserInfo = async(token:string)=>{
        try {
            setLoading(true)
            const res= await fetch("http://localhost:8000/user/me",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const user = await res.json()
            if(user){
                setLoading(false)
                setUser(user.user)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    if(loading || !user)
    {
        return <div>Loafding</div>
    }
  return (
    <div className="relative mx-auto mt-20 mb-6 w-full min-w-0 max-w-md break-words bg-white rounded-xl shadow-lg md:max-w-2xl">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div className="mt-20 w-full text-center">
            <div className="flex justify-center pt-8 pb-0 lg:pt-4">
              <div className="p-3 text-center">
                <span className="block text-xl font-bold tracking-wide uppercase text-slate-700">
                  3,360
                </span>
                <span className="text-sm text-slate-400">Photos</span>
              </div>
              <div className="p-3 text-center">
                <span className="block text-xl font-bold tracking-wide uppercase text-slate-700">
                  2,454
                </span>
                <span className="text-sm text-slate-400">Followers</span>
              </div>

              <div className="p-3 text-center">
                <span className="block text-xl font-bold tracking-wide uppercase text-slate-700">
                  564
                </span>
                <span className="text-sm text-slate-400">Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
            {user.username}
          </h3>
          <div className="mt-0 mb-2 text-xs font-bold uppercase text-slate-400">
            <i className="mr-2 opacity-75 fas fa-map-marker-alt text-slate-400"></i>
            Paris, France
          </div>
        </div>
        <div className="py-6 mt-6 text-center border-t border-slate-200">
          <div className="flex flex-wrap justify-center">
            <div className="px-4 w-full">
              <p className="mb-4 font-light leading-relaxed text-slate-600">
                An artist of considerable range, Mike is the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                and records all of his own music, giving it a warm.
              </p>
              <a
                href="javascript:;"
                className="font-normal text-slate-700 hover:text-slate-400"
              >
                Follow Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile