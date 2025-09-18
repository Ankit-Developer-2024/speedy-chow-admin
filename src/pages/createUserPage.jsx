import SideBar from "../features/sideBar/sideBar"; 
import { CreateUser } from "../features/user/createUser";

export const CreateUserPage = function () {
    return (
        <div>
             <SideBar>
                 <CreateUser></CreateUser>
             </SideBar>
        </div>
    );
}

