import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { IUser } from "../../constants/types";
import Loading from "../../components/Loading";
import { PiNotePencilFill } from "react-icons/pi";
import { VscSave } from "react-icons/vsc";
import { url } from "../../constants/base_url";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user.token !== "") {
      getUserInfo();
    }
  }, []);


  const getUserInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch(url+"/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.status) {
        setLoading(false);
        setUserInfo(data.user);
        setUsername(data.user.username);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="relative mx-auto mt-20 mb-6 w-full min-w-0 max-w-md break-words bg-white rounded-xl shadow-lg md:max-w-2xl">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={userInfo?.avatar}
                  className="bg-white shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
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
          <div className="flex flex-col items-center mt-2">
            <div className="flex justify-center">
              {editable ? (
                <>
                  <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <VscSave size={20} />
                </>
              ) : (
                <>
                  <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
                    {username ?? ""}
                  </h3>{" "}
                  <PiNotePencilFill onClick={() => setEditable(!editable)} />
                </>
              )}
              {/* {editable ? <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /> :<h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
            {username ??""}
          </h3>} */}
              {/* <PiNotePencilFill onClick={() => setEditable(!editable)} /> */}
            </div>
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
                  href="#"
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
};

export default UserProfile;
