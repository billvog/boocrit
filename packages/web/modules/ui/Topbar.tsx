import { useLogoutUserMutation } from "@boocrit/controller";
import { Popover } from "@headlessui/react";
import React, { useContext } from "react";
import { GoChevronDown } from "react-icons/go";
import { AuthContext } from "../Auth/AuthProvider";
import { useApolloClient } from "@apollo/client";
import router from "next/router";
import { toast } from "react-toastify";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = ({}) => {
  const { me } = useContext(AuthContext);
  if (!me) return null;

  const [logoutUser] = useLogoutUserMutation({ errorPolicy: "all" });
  const apolloClient = useApolloClient();

  return (
    <div className="sticky top-0 w-full bg-primary-500 bg-opacity-5 backdrop-filter backdrop-blur-sm flex items-center justify-between p-3">
      <div />
      <div>
        <Popover>
          <Popover.Button>
            <div className="relative">
              <img
                src={me.profileImage}
                className="cursor-pointer rounded-full w-10 h-10 select-none"
              />
              <div className="absolute -bottom-1 -left-1 bg-accent text-accent-darkest rounded-full p-0.5 ring-2 ring-primary-50">
                <GoChevronDown size={14} />
              </div>
            </div>
          </Popover.Button>
          <Popover.Panel
            className="absolute z-10 bg-accent border-2 border-accent-semidark rounded-2xl rounded-tr-none"
            style={{ width: 240, transform: "translateX(-200px)" }}
          >
            <div className="divide-y-2 divide-accent-semidark">
              <div className="text-accent-darkest font-medium text-sm px-4 py-2.5">
                Logged in as{" "}
                <span className="font-black font-slab">{me.uid}</span>
              </div>
              <div className="p-1 space-y-0.5">
                <PopoverItem text="My account" onClick={() => {}} />
                <PopoverItem
                  text="Logout"
                  onClick={() => {
                    toast.promise(
                      new Promise(async (res, rej) => {
                        const { data } = await logoutUser();
                        if (!data?.LogoutUser.ok) {
                          return rej();
                        }

                        await apolloClient.resetStore();
                        router.replace("/");
                        res(true);
                      }),
                      {
                        pending: "Please wait...",
                        error: "Something went wrong",
                        success: "Successfuly logged out",
                      }
                    );
                  }}
                />
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

interface PopoverItemProps {
  text: string;
  onClick: () => any;
}
const PopoverItem: React.FC<PopoverItemProps> = ({ text, onClick }) => {
  return (
    <div
      className="text-accent-darkest hover:bg-accent-semidark rounded-xl font-medium text-sm px-3 py-1.5 select-none cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
};
